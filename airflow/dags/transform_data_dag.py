# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

import json
import os
import uuid
from datetime import datetime

from airflow import models
from airflow.operators.python import PythonOperator
from azure.cosmos import *
from azure.cosmos import CosmosClient
from pyspark.sql import SparkSession, types
from pyspark.sql.functions import lit

DATABASE_NAME = "wine-data-database"
CONTAINER_NAME = "wine-data-container"
STORAGE_CONNECTION_STRING = os.getenv("STORAGE_CONNECTION_STRING")
COSMOS_CONNECTION_STRING = os.getenv("COSMOS_CONNECTION_STRING")
AIRFLOW_HOME = os.getenv("AIRFLOW_HOME")

def process_csv(dataframes, categories):

    new_dataframes = []

    json_paths = []

    for dataframe, category in zip(dataframes, categories):

        category = category.split("_")[0].title()
        
        new_dataframe = dataframe.groupBy('Country', 'Region', 'Winery') \
                                 .avg("Rating", "Price", "NumberOfRatings") \
                                 .sort("Country")

        new_dataframe = new_dataframe.withColumn("category", lit(category))
                
        new_dataframes.append(new_dataframe)

    for dataframe, category in zip(new_dataframes, categories):

        dfJson = dataframe.toPandas()

        dfJson['id'] = [uuid.uuid4().hex for _ in range(len(dfJson.index))]

        df_dict = dfJson.to_dict(orient="records")

        with open(f"/opt/airflow/processed_files/{category}.json", 'w') as f:
            json.dump(df_dict, f, indent=4)
        
        json_paths.append(f'{category}.json')
    
    return json_paths

def send_files_to_cosmos(file_path: str, database_name: str, container_name: str, cosmos_connection_string: str) -> dict:

    cosmos_client = CosmosClient.from_connection_string(cosmos_connection_string)

    with open(f"/opt/airflow/processed_files/{file_path}.json", 'r', encoding="UTF-8") as file:
        file_as_json = json.load(file)

    for dicts in file_as_json:
       cosmos_client.get_database_client(database_name).get_container_client(container_name).create_item({"id": dicts["id"], "data": dicts})


with models.DAG(
    dag_id=f"process-wine-dataset",
    start_date=datetime.now(),
    catchup=True,
    schedule_interval="@once",
    tags=['transformation'],
    render_template_as_native_obj=True,
    is_paused_upon_creation=False
) as dag:

    RED_WINE_PATH = f"{AIRFLOW_HOME}/source_data/Red.csv"
    WHITE_WINE_PATH = f"{AIRFLOW_HOME}/source_data/White.csv"
    ROSE_WINE_PATH = f"{AIRFLOW_HOME}/source_data/Rose.csv"
    SPARKLING_WINE_PATH = f"{AIRFLOW_HOME}/source_data/Sparkling.csv"

    spark = SparkSession.builder \
        .master("local[*]") \
        .appName('test') \
        .getOrCreate()

    schema = types.StructType([
        types.StructField('Name', types.StringType(), True),
        types.StructField('Country', types.StringType(), True),
        types.StructField('Region', types.StringType(), True),
        types.StructField('Winery', types.StringType(), True),
        types.StructField('Rating', types.FloatType(), True),
        types.StructField('NumberOfRatings', types.FloatType(), True),
        types.StructField('Price', types.FloatType(), True),
        types.StructField('Year', types.IntegerType(), True)
    ])

    white_wine = spark.read \
                        .option("header", "true") \
                        .schema(schema) \
                        .csv(WHITE_WINE_PATH) 

    red_wine = spark.read \
                        .option("header", "true") \
                        .schema(schema) \
                        .csv(RED_WINE_PATH)

    rose_wine = spark.read \
                        .option("header", "true") \
                        .schema(schema) \
                        .csv(ROSE_WINE_PATH)

    sparkling_wine = spark.read \
                        .option("header", "true") \
                        .schema(schema) \
                        .csv(SPARKLING_WINE_PATH)

    files = [
        white_wine,
        red_wine,
        rose_wine,
        sparkling_wine
    ]

    names = [
        "white_wine",
        "red_wine",
        "rose_wine",
        "sparkling_wine"
    ]

    json_paths = []

    process_wine_csv = PythonOperator(
        task_id=f"process-wine-datasets",
        python_callable=process_csv,
        op_kwargs=dict(
            dataframes=files,
            categories=names
        )
    )
    for name in names:
        files_to_cosmos = PythonOperator(
            task_id=f"send-file-{name}-to-cosmos",
            python_callable=send_files_to_cosmos,
            op_kwargs=dict(
                file_path=f"{name}",  
                database_name=DATABASE_NAME,  
                container_name=CONTAINER_NAME,  
                cosmos_connection_string=COSMOS_CONNECTION_STRING)
        )
        
        process_wine_csv >> files_to_cosmos 

