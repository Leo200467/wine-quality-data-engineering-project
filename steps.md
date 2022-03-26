# Terraform

The main file will setup the following things for you in Azure Cloud:

* Linux Virtual Machine named "data-engineering-project"
* Storage V2 (Data Lake Gen2) named "diag" + random string to be used as Shared Storage and Data Lake
* Network security group named "myNetworkSecurityGroup" for SSH access
* Network Interface named "myNIC" for public IP address and access
* OS Disk 30 Gb Premium SSD named "myOsDisk" for OS Storage
* Standard Public IP Address named "myPublicIP"
* Virtual Network manager named "myVnet" used to share access between VM and Storages

# After Terraform apply

if connection does't work, change .pem permissions. 
if still doesn't connect, check ssh config file.

HTOP in VM terminal to see actual configs/machine specs.

* Go to Azure Portal and access your storage, you should look for something like "diagXXXXXX" with "Type" Storage account, click on it.
* Then, look for "Data Storage" tab, you can click on "File shares" and access your Shared Storage.
* Select "Connect" and a new tab on the right side of the screen will popup. 
* Select "Linux" and copy the command.
* Now access your VM and run the command in terminal, this should add the files to your VM.
* In your terminal, "cd /mnt/sharedstorage"
* In your terminal, "sudo bash setup.sh". This bash script will do everyting and setup your VM.
* It should run all necessary installs, create folder structure and set permissions to Airflow to workk properly.


# Sources

##### https://learn.hashicorp.com/tutorials/terraform/azure-build?in=terraform/azure-get-started

##### https://docs.microsoft.com/pt-br/azure/developer/terraform/create-linux-virtual-machine-with-infrastructure#4-create-a-terraform-execution-plan

##### https://stackoverflow.com/questions/71292185/error-host-for-provisioner-cannot-be-empty

##### https://www.techcrumble.net/2019/02/how-to-create-an-azure-file-share-and-connect-to-a-linux-virtual-machine/

##### https://stackoverflow.com/questions/59412917/errno-13-permission-denied-when-airflow-tries-to-write-to-logs


az vm deallocate --resource-group myResourceGroup --name data-engineering-project

Deallocate VMs and stop billing