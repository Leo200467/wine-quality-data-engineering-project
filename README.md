# Data Engineering Zoomcamp 2022 Project

## This repo contains final project for certification of completion in Data Engineering Zoomcamp by Data Talks.  

# Problem Description

Wine is one of the most consumed beverages in the world and one of the oldests drinks of humanity. This classic and somewhat mythical liquid is part of humanity history. 

This project will analyse data regarding 4 types of wine: 
* Red; 
* Rose; 
* Sparkling and; 
* White. 

This types are rated by taste, with pricing and quantity of ratings, along with country and region that the wine belongs.

The wines are segmented initialy by files with each type, our job is to join this data into a single accessible file. 
This process will also require that we do some transformations to normalize and get some early insights on our data.

Step by step, our challenge is:
* Upload all source data into a Data Lake;
* Transform this data i.e. change types, get average values from numeric columns, convert from CSV to JSON;
* Upload processed files to our Data Warehouse.

~Should be easy isn't?~

# DATASET

Wine ratings, pricings, number of ratings, country and region scrapped from Vivino.com

## https://www.kaggle.com/datasets/budnyak/wine-rating-and-price

# Technologies used: 

* Programming Languages
    * Python
* Infrastructure as a Code
    * Terraform
* Cloud Infrastructure
    * Azure VM Instance - Processing
    * Azure Data Lake Gen 2 - Data Lake
    * Azure Cosmos DB - Data Warehouse
* Containerization
    * Docker
* Orchestration
    * Airflow
* Transformations
    * PySpark
* Visualization
    * Microsoft Power BI

## More details on the architecture in the following diagram

![Architecture](/images/DE%20Project%20Arch.jpg)

# Reproducing the project

Steps for reproducing this project can be found in this [file](/steps.md)

# Special Thanks to Data Talks! 
