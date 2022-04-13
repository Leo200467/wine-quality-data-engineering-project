# Bash

This tutorial was made using MINGW64 in Windows 10.

# Azure CLI

In this tutorial, Azure CLI is used for authentication. 

For instructions on how to download Azure CLI in your OS, follow this link:
* https://docs.microsoft.com/en-us/cli/azure/

You can use Azure Free Trial for this tutorial.
The amount of free credits is more than enough.

After Azure CLI is installed, type 'az login'. This should prompt a Microsoft login page in your browser.
To confirm your current account, type 'az account show' and copy your 'id', this is your subscription id.

* ### Service Principal

For automated build systems, Microsoft suggest creating a Service Principal for restricting permissions of this service.
After confirming your current account with 'az account show', type the following:

```
export MSYS_NO_PATHCONV=1

az ad sp create-for-rbac --name <service_principal_name> --role Contributor
```
The output should look like this:
```
{
  "appId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "displayName": "azure-cli-YYYY-MM-DD-hh-mm-ss",
  "password": "xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxx.xx",
  "tenant": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

You can choose any name for your service principal. 
Store appId, password and tenant values, they will be needed for the next steps.

* ### Applying service credentials as environment variables

Look for your bashrc file, it should be found in ~/.bashrc or C:\Users\your-user in Windows.
If you are using Windows and didn't found the file, create it. Name it bashrc.
```
export ARM_SUBSCRIPTION_ID="<your_subscription_id>"
export ARM_TENANT_ID="<service_principal_tenant>"
export ARM_CLIENT_ID="<service_principal_appid>"
export ARM_CLIENT_SECRET="<service_principal_password>"
```
Then you can run the following code in Bash
```
. ~/.bashrc
```

Now all your environment should be ready to go and apply Terraform.

# Terraform

You will need Terraform installed in your computer.
If you don't have Terraform installed, follow Hashicorp tutorial in this link:
* https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/aws-get-started

* ### Terraform Initialization

The main file will setup the following things for you in Azure Cloud:

* Linux Virtual Machine named "data-engineering-project"
* Storage V2 (Data Lake Gen2) named "storage" + random string to be used as Shared Storage and Data Lake
* Network security group named "myNetworkSecurityGroup" for SSH access
* Network Interface named "myNIC" for public IP address and access
* OS Disk 30 Gb Premium SSD named "myOsDisk" for OS Storage
* Standard Public IP Address named "myPublicIP"
* Virtual Network manager named "myVnet" used to share access between VM and Storages
* Azure Cosmos DB SQL Serverless istance named "cosmos-db-xxxxx", with a container named "wine-data-container" and database named "wine-data-database"

In your terminal, go to 'terraform-azure' folder and run
```
terraform init
```

It should install a .terraform folder and updated it with all needed packages.

* ### Terraform Plan

After initialization, you can run the following command in your terminal:
```
terraform plan -out main.tfplan
```

This command will output a Terraform plan to be applied latter.

* ### Terraform Apply

With your plan made and ready, time to apply it and see all infrastructure magic happens.
In your terminal:
```
terraform apply main.tfplan
```

This apply will output a public IP Adress, you will need this IP for the next step.

You can now go to your [Azure Dashboard](https://portal.azure.com/#blade/HubsExtension/BrowseAll) and see all created resources. 

* ### The SSH Key

The Terraform process will also create a SSH key named "linuxkey.pem" in your ~/.ssh or C:\Users\your-user\.ssh folder.
This is the SSH key that will be needed to connect to our VM in Azure.

You should now try to connect via SSH to the VM using the following command:

```
ssh -i C:/Users/your-user/.ssh/linuxkey.pem azureuser@public-ip-output
```

You can also use Remote - SSH extension from VSCODE. 
Extension ID: ms-vscode-remote.remote-ssh

# After Terraform apply

HTOP in VM terminal to see actual configs/machine specs.
You can press F10 after that.

Now, follow this steps:

* Go to Azure Portal and access your storage, you should look for something like "storageXXXXXX" with "Type" Storage account, click on it;
* Then, look for "Data Storage" tab, you can click on "File shares" and access your Shared Storage named "sharedstorage";
* Select "Connect" and a new tab on the right side of the screen will popup; 
* Select "Linux" and copy the command;
* Now access your VM and run the command in terminal, this should add the files to your VM;
* In your terminal, "cd /mnt/sharedstorage";
* In your terminal, "sudo bash setup.sh". This bash script will do the heavy lifting of moving files, permissions and folder structure in this VM, it may take a while;
* In your VM, go to /home/azureuser/airflow and type if you are accessing with SSH + VSCode ```code airflow.env``` or other type of editing command(vi, nano);
* Go to back to your [Azure Resources Panel](https://portal.azure.com/#blade/HubsExtension/BrowseAll) and into your "storageXXXXXX";
* Then, look for "Security + Network" tab, you can click on "Access Keys" and copy your CONNECTION STRING;
* Go to back to your [Azure Resources Panel](https://portal.azure.com/#blade/HubsExtension/BrowseAll) and into your "cosmos-db-xxxxx";
* Then, look for "Keys" tab and copy your PRIMARY CONNECTION STRING;
* Insert your both as a value to the variable STORAGE_CONNECTION_STRING and COSMOS_CONNECTION_STRING in airflow.env file, save it and close;

Now you are ready to go.

Again in your terminal:
```
cd /home/azureuser/airflow

sudo docker-compose build

sudo docker-compose up
```

# Airflow

All DAGs in this project are configured to run after Airflow is initialized and you should not have to worry about it.

If you are using VSCode, after running 'sudo docker-compose up', it should prompt all port forwarding for you and alert that the port 8080 is being fowarded for your computer.

If you are not using VSCode, then you will have to do a manual port forwarding. I recommend this tutorial for Azure CLI:
* https://docs.microsoft.com/en-us/azure/virtual-machines/linux/nsg-quickstart#quickly-open-a-port-for-a-vm

And for other options, you can do port forwarding using SSH, as this link explains:
* https://unix.stackexchange.com/a/10429

With access to Airflow login, you can type "admin" for both user and password to login. 

You should be able to see "upload_files_dag" running and "transform_data_dag" too.

Explaining a bit about these dags: 
* upload_files_dag is just taking files from source_data folder and sending them to Azure Data Lake. It could be done using API call, then a download and finaly a upload, but I wanted to keep it simple as some parts of this project became more complicated;
* transform_data_dag is more robust. This dag will take files from source_data, do a group by with some averages using PySpark, then saving the file as a JSON list in processed_files folder. After the transformation is finished, the second step of this dag is to upload each collection inside the JSON into a Cosmos DB Database and container, where the transformed data is saved, this is the Data Warehouse of this project.

# Power BI

The visualization is made using Power BI. You can take a look into the finished dashboard [here](https://app.powerbi.com/view?r=eyJrIjoiN2Y2NmMwZmUtNGFhNS00N2IzLTk2NWUtNjQyMTRhMWNhNDI2IiwidCI6IjA0NDc2NjVjLWViZTUtNDJiMy05ODU1LTRkMDdmY2M0YzBmZCJ9&pageName=ReportSection).

You may need to create another kind of account to use Power BI for free, as it is a service that you can't use with a normal account.
If you have interest in following this part of the tutorial, [follow this steps to create a free Power BI account](https://docs.microsoft.com/en-us/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).

The connection of Cosmos DB and Power BI is easy, you will need to provide your Cosmos DB link and Primary Key, both can be found in back in your [Azure Resources Panel](https://portal.azure.com/#blade/HubsExtension/BrowseAll) and into your "cosmos-db-xxxxx", inside the "Keys" tab.

## Getting Data into Power BI

![Step One](/images/pbi-step-1.png)
![Step Two](/images/pbi-step-2.png)

Remember that we are using collections, a NoSQL approach, so you will need to do some simple steps in Power BI in order to work properly with your data.
What you will need to do is expand each collection into columns. That's a easy task for Power Query. 

## First, load Cosmos DB Data into your Power BI report. 

![Step Three](/images/pbi-step-3.png)

![Step Four](/images/pbi-step-4.png)

## Select "Transform Data"
![Step Five](/images/pbi-step-5.png)

## Input your Primary Key from Cosmos DB
![Step Six](/images/pbi-step-6.png)

## Now we should start transforming data using the UI

![Step Seven](/images/pbi-step-7.png)

![Step Eight](/images/pbi-step-8.png)

## Expand the record into columns and select only "data"
![Step Nine](/images/pbi-step-9.png)

![Step Ten](/images/pbi-step-10.png)

## Expand 'data' records into columns again, containing values that were transformed by PySpark
![Step Eleven](/images/pbi-step-11.png)

![Step Twelve](/images/pbi-step-12.png)


## This is all we need to do. Now you can plan with Power BI visuals.
![Step Thirteen](/images/pbi-step-13.png)



## Alternatively, you can just insert this code in "Advanced Editor"

```
let
    Source = DocumentDB.Contents("REPLACE THIS WITH YOUR COSMOS URI", "wine-data-database", "wine-data-container"),
    #"Expanded Document" = Table.ExpandRecordColumn(Source, "Document", {"data"}, {"data"}),
    #"Expanded data" = Table.ExpandRecordColumn(#"Expanded Document", "data", {"Country", "Region", "Winery", "avg(Rating)", "avg(Price)", "avg(NumberOfRatings)", "category"}, {"Country", "Region", "Winery", "avg(Rating)", "avg(Price)", "avg(NumberOfRatings)", "category"}),
    #"Changed Type" = Table.TransformColumnTypes(#"Expanded data",{{"avg(Rating)", type number}, {"avg(Price)", type number}, {"avg(NumberOfRatings)", type number}, {"category", type text}, {"Winery", type text}, {"Region", type text}, {"Country", type text}}),
    #"Reordered Columns" = Table.ReorderColumns(#"Changed Type",{"Country", "Region", "Winery", "category", "avg(Rating)", "avg(Price)", "avg(NumberOfRatings)"})
in
    #"Reordered Columns"
```

![Step Fourteen](/images/pbi-step-14.png)

![Step Fifteen](/images/pbi-step-15.png)

![Step Sixteen](/images/pbi-step-16.png)

![Step Seventeen](/images/pbi-step-17.png)

![Step Eighteen](/images/pbi-step-18.png)

# Sources

* ### https://learn.hashicorp.com/tutorials/terraform/azure-build?in=terraform/azure-get-started

* ### https://docs.microsoft.com/en-us/azure/developer/terraform/create-linux-virtual-machine-with-infrastructure

* ### https://docs.microsoft.com/en-us/azure/developer/terraform/get-started-windows-bash?tabs=bash

* ### https://stackoverflow.com/questions/71292185/error-host-for-provisioner-cannot-be-empty

* ### https://www.techcrumble.net/2019/02/how-to-create-an-azure-file-share-and-connect-to-a-linux-virtual-machine/

* ### https://stackoverflow.com/questions/59412917/errno-13-permission-denied-when-airflow-tries-to-write-to-logs

* ### https://stackoverflow.com/questions/61514887/how-to-trigger-a-dag-on-the-success-of-a-another-dag-in-airflow-using-python

* ### https://sparkbyexamples.com/pyspark/pyspark-exception-java-gateway-process-exited-before-sending-the-driver-its-port-number/

# DATASET

## https://www.kaggle.com/datasets/budnyak/wine-rating-and-price
