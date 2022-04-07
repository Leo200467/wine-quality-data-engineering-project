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

### Service Principal

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

### Applying service credentials as environment variables

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

### Terraform Initialization

The main file will setup the following things for you in Azure Cloud:

* Linux Virtual Machine named "data-engineering-project"
* Storage V2 (Data Lake Gen2) named "diag" + random string to be used as Shared Storage and Data Lake
* Network security group named "myNetworkSecurityGroup" for SSH access
* Network Interface named "myNIC" for public IP address and access
* OS Disk 30 Gb Premium SSD named "myOsDisk" for OS Storage
* Standard Public IP Address named "myPublicIP"
* Azure Cosmos DB SQL Serverless istance, with a container named "wine-container"
* Virtual Network manager named "myVnet" used to share access between VM and Storages

In your terminal, go to 'terraform-azure' folder and run
```
terraform init
```

It should install a .terraform folder and updated it with all needed packages.

### Terraform Plan

After initialization, you can run the following command in your terminal:
```
terraform plan -out main.tfplan
```

This command will output a Terraform plan to be applied latter.

### Terraform Apply

With your plan made and ready, time to apply it and see all infrastructure magic happens.
In your terminal:
```
terraform apply main.tfplan
```

This apply will output a public IP Adress, you will need this IP for the next step.

You can now go to your [Azure Dashboard](https://portal.azure.com/#blade/HubsExtension/BrowseAll) and see all created resources. 

### The SSH Key

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
* Then, look for "Data Storage" tab, you can click on "File shares" and access your Shared Storage;
* Select "Connect" and a new tab on the right side of the screen will popup; 
* Select "Linux" and copy the command;
* Now access your VM and run the command in terminal, this should add the files to your VM;
* In your terminal, "cd /mnt/sharedstorage";
* In your terminal, "sudo bash setup.sh". This bash script will do the heavy lifting of moving files, permissions and folder structure in this VM;
* Go to back to your [Azure Resources Panel](https://portal.azure.com/#blade/HubsExtension/BrowseAll) and into your "storageXXXXXX";
* Then, look for "Security + Network" tab, you can click on "Access Keys" and copy your Connection string;
* In your VM, go to /home/azureuser/airflow and type if you are accessing with SSH + VSCode ```code airflow.env``` or other type of editing command(vi, nano);
* Insert your Connection string as a value to the variable STORAGE_CONNECTION_STRING;

Now you are ready to go.

Again in your terminal:
```
cd /home/azureuser/airflow

sudo docker-compose build

sudo docker-compose up
```

# Airflow

The following steps are optional, as the DAG is configured to run after Airflow is initialized.

If you are using VSCode, it should prompt all port forwarding for you and alert that the port 8080 is being fowarded for your computer.

If you are not using VSCode, then you will have to do a manual port forwarding. I recommend this tutorial for Azure CLI:
* https://docs.microsoft.com/en-us/azure/virtual-machines/linux/nsg-quickstart#quickly-open-a-port-for-a-vm

And for other options, you can do port forwarding using SSH, as this link explains:
* https://unix.stackexchange.com/a/10429

With access to Airflow admin panel, you can type "admin" for both user and password to login. 

You should be able to the "upload_files_dag" running and "future_dag" too.

They are simple DAGs to get files to the container 'data-lake' in Azure Storage.

# Sources

##### https://learn.hashicorp.com/tutorials/terraform/azure-build?in=terraform/azure-get-started

##### https://docs.microsoft.com/en-us/azure/developer/terraform/create-linux-virtual-machine-with-infrastructure

##### https://docs.microsoft.com/en-us/azure/developer/terraform/get-started-windows-bash?tabs=bash

##### https://stackoverflow.com/questions/71292185/error-host-for-provisioner-cannot-be-empty

##### https://www.techcrumble.net/2019/02/how-to-create-an-azure-file-share-and-connect-to-a-linux-virtual-machine/

##### https://stackoverflow.com/questions/59412917/errno-13-permission-denied-when-airflow-tries-to-write-to-logs

##### https://stackoverflow.com/questions/61514887/how-to-trigger-a-dag-on-the-success-of-a-another-dag-in-airflow-using-python

##### https://sparkbyexamples.com/pyspark/pyspark-exception-java-gateway-process-exited-before-sending-the-driver-its-port-number/

# DATASET

## https://www.kaggle.com/datasets/budnyak/wine-rating-and-price


az vm deallocate --resource-group myResourceGroup --name data-engineering-project

Deallocate VMs and stop billing