# Data Engineering Zoomcamp 2022 Project

## This repo contains final project for certification of completion in Data Engineering Zoomcamp by Data Talks.  

# Problem Description

Wine is one of the most consumed beverages in the world and one of the oldests drinks of humanity. This classic and somewhat mythical liquid is part of humanity history. 

This project will analyse data regarding 4 types of wine: 
* Red; 
* Rose; 
* Sparkling; 
* White. 

This types are rated by taste, pricing in euros and quantity of ratings for each wine, along with country and region of the wine.

The wines are segmented initialy by files with each type, part of our job is to join this data into a single accessible file that can be clustered by each country. 
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
    * Python 3.8
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

![image](https://user-images.githubusercontent.com/58035475/163897728-cf139886-993e-4992-b107-b52ed6a32285.png)

# Reproducing the project

Steps for reproducing this project can be found in this [file](/steps.md)

# Dashboard

![Architecture](/images/dashboard.png)

The visualization is made using Power BI. You can take a look into the finished dashboard [here](https://app.powerbi.com/view?r=eyJrIjoiN2Y2NmMwZmUtNGFhNS00N2IzLTk2NWUtNjQyMTRhMWNhNDI2IiwidCI6IjA0NDc2NjVjLWViZTUtNDJiMy05ODU1LTRkMDdmY2M0YzBmZCJ9&pageName=ReportSection).



# Special Thanks to (Data Talks)[https://datatalks.club/]! 
