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

import os

from datetime import datetime

from airflow import models
from airflow.operators.python import PythonOperator
from azure.storage.filedatalake import DataLakeServiceClient
from airflow.operators.dagrun_operator import TriggerDagRunOperator
from airflow.utils.trigger_rule import TriggerRule


STORAGE_CONNECTION_STRING = os.getenv("STORAGE_CONNECTION_STRING")
AIRFLOW_HOME = os.getenv("AIRFLOW_HOME")
RED_WINE_PATH = f"{AIRFLOW_HOME}/source_data/Red.csv"
WHITE_WINE_PATH = f"{AIRFLOW_HOME}/source_data/White.csv"
ROSE_WINE_PATH = f"{AIRFLOW_HOME}/source_data/Rose.csv"
SPARKLING_WINE_PATH = f"{AIRFLOW_HOME}/source_data/Sparkling.csv"

def upload_file_to_directory_bulk(local_file_path: str, uploaded_file_name: str, directory: str, file_system: str, storage_connection_string: str):
    
    if storage_connection_string == "":
        raise Exception("Storage connection string is empty. Change the variable in airflow.env file")

    try:  
        global service_client

        service_client = DataLakeServiceClient.from_connection_string(storage_connection_string)

        file_system_client = service_client.get_file_system_client(file_system)

        directory_client = file_system_client.get_directory_client(directory)
        
        file_client = directory_client.get_file_client(uploaded_file_name)

        local_file = open(local_file_path,'r')

        file_contents = local_file.read()

        file_client.upload_data(file_contents, overwrite=True)

    except Exception as e:
      print(e)

with models.DAG(
    "data-ingestion-to-data-lake",
    start_date=datetime.now(),
    catchup=True,
    schedule_interval="@once",
    tags=['ingestion'],
    is_paused_upon_creation=False,
) as dag:

    upload_red_wine_csv = PythonOperator(
        task_id="upload-red-wine-dataset",
        python_callable=upload_file_to_directory_bulk,
        op_kwargs=dict(
            local_file_path=RED_WINE_PATH,
            uploaded_file_name="winequality-red.csv",
            directory="wine-quality-data",
            file_system="data-lake",
            storage_connection_string=STORAGE_CONNECTION_STRING
        )
    )

    upload_white_wine_csv = PythonOperator(
        task_id="upload-white-wine-dataset",
        python_callable=upload_file_to_directory_bulk,
        op_kwargs=dict(
            local_file_path=WHITE_WINE_PATH,
            uploaded_file_name="winequality-white.csv",
            directory="wine-quality-data",
            file_system="data-lake",
            storage_connection_string=STORAGE_CONNECTION_STRING
        )
    )

    upload_rose_wine_csv = PythonOperator(
        task_id="upload-rose-wine-dataset",
        python_callable=upload_file_to_directory_bulk,
        op_kwargs=dict(
            local_file_path=ROSE_WINE_PATH,
            uploaded_file_name="winequality-rose.csv",
            directory="wine-quality-data",
            file_system="data-lake",
            storage_connection_string=STORAGE_CONNECTION_STRING
        )
    )

    upload_sparkling_wine_csv = PythonOperator(
        task_id="upload-sparkling-wine-dataset",
        python_callable=upload_file_to_directory_bulk,
        op_kwargs=dict(
            local_file_path=SPARKLING_WINE_PATH,
            uploaded_file_name="winequality-sparkling.csv",
            directory="wine-quality-data",
            file_system="data-lake",
            storage_connection_string=STORAGE_CONNECTION_STRING
        )
    )

    trigger_process = TriggerDagRunOperator(
        task_id='trigger', 
        trigger_rule=TriggerRule.ALL_SUCCESS, 
        trigger_dag_id="process-wine-dataset",
        reset_dag_run=True)

    upload_red_wine_csv >> upload_white_wine_csv >> upload_rose_wine_csv >> upload_sparkling_wine_csv >> trigger_process





