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
from airflow.operators.bash import BashOperator
from azure.storage.filedatalake import DataLakeServiceClient

STORAGE_ACCOUNT_KEY = os.getenv("STORAGE_ACCOUNT_KEY")
STORAGE_ACCOUNT_NAME = os.getenv("STORAGE_ACCOUNT_NAME")
STORAGE_CONNECTION_STRING = os.getenv("STORAGE_CONNECTION_STRING")
AIRFLOW_HOME = os.getenv("AIRFLOW_HOME")
RED_WINE_DATASET_URL="https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv"
WHITE_WINE_DATASET_URL="https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv"
RED_WINE_PATH = f"{AIRFLOW_HOME}/winequality-red.csv"
WHITE_WINE_PATH = f"{AIRFLOW_HOME}/winequality-white.csv"

def initialize_storage_account(storage_connection_string):
    
    try:  
        global service_client

        service_client = DataLakeServiceClient.from_connection_string(storage_connection_string)

        return service_client
    
    except Exception as e:
        print(e)


def upload_file_to_directory_bulk(local_file_path: str, uploaded_file_name: str, directory: str, file_system: str, storage_connection_string: str):
    
    try:  
        global service_client

        service_client = DataLakeServiceClient.from_connection_string(storage_connection_string)

        return service_client
    
    except Exception as e:
        print(e)

    try:

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
    start_date=datetime(2021, 1, 1),
    catchup=False,
    schedule_interval=None,
    tags=['ingestion'],
) as dag:
    download_white_wine_dataset = BashOperator(
        task_id="download-white-wine-dataset",
        bash_command = f"""
                        curl -SL {WHITE_WINE_DATASET_URL} > {AIRFLOW_HOME}/white_wine.csv
                        """
    )

    download_red_wine_dataset = BashOperator(
        task_id="download-red-wine-dataset",
        bash_command = f"""
                        curl -SL {RED_WINE_DATASET_URL} > {AIRFLOW_HOME}/red_wine.csv
                        """
    )

    upload_red_wine_csv = PythonOperator(
        task_id="upload-red-wine-dataset",
        python_callable=upload_file_to_directory_bulk,
        op_kwargs=dict(
            local_file_path={RED_WINE_PATH},
            uploaded_file_name="winequality-red.csv",
            directory="data-lake",
            file_system="data-lake",
            storage_connection_string=STORAGE_CONNECTION_STRING
        )
    )

    upload_white_wine_csv = PythonOperator(
        task_id="upload-white-wine-dataset",
        python_callable=upload_file_to_directory_bulk,
        op_kwargs=dict(
            local_file_path={WHITE_WINE_PATH},
            uploaded_file_name="winequality-white.csv",
            directory="data-lake",
            file_system="data-lake",
            storage_connection_string=STORAGE_CONNECTION_STRING
        )
    )

    download_red_wine_dataset >> download_white_wine_dataset >> upload_red_wine_csv >> upload_white_wine_csv





