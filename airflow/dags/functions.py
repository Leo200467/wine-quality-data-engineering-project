from pyspark.sql.functions import lit, monotonically_increasing_id
from azure.cosmos import CosmosClient 
import json
import uuid


def process_csv(dataframes, categories):

    new_dataframes = []

    json_paths = []

    for dataframe, category in zip(dataframes, categories):

        category = category.split("_")[0].title()
        
        new_dataframe = dataframe.groupBy('Country', 'Region', 'Winery') \
                                 .avg("Rating", "Price") \
                                 .sort("Country")

        new_dataframe = new_dataframe.withColumn("category", lit(category))
                
        new_dataframes.append(new_dataframe)

    for dataframe, category in zip(new_dataframes, categories):

        dfJson = dataframe.toPandas()

        dfJson['id'] = [uuid.uuid4().hex for _ in range(len(dfJson.index))]

        df_dict = dfJson.to_dict(orient="records")

        with open(f"processed_files/{category}.json", 'w') as f:
            json.dump(df_dict, f, indent=4)
        
        json_paths.append(f'{category}.json')
    
    return json_paths

def send_files_to_cosmos(file_path: str, database_name: str, container_name: str, cosmos_connection_string: str) -> dict:

    cosmos_client = CosmosClient.from_connection_string(cosmos_connection_string)

    with open(f"processed_files/{file_path}", 'r', encoding="UTF-8") as file:
        file_as_json = json.load(file)

    for dicts in file_as_json:
       cosmos_client.get_database_client(database_name).get_container_client(container_name).create_item({"id": dicts["id"], "data": dicts})
