# Configure the Microsoft Azure Provider
terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "~>2.0"
    }
  }
}
provider "azurerm" {
  features {}
}

# Create a resource group if it doesn't exist
resource "azurerm_resource_group" "myterraformgroup" {
    name     = "myResourceGroup"
    location = var.location

    tags = {
        environment = "Data Engineering Project"
    }
}

# Create virtual network
resource "azurerm_virtual_network" "myterraformnetwork" {
    name                = "myVnet"
    address_space       = ["10.0.0.0/16"]
    location            = var.location
    resource_group_name = azurerm_resource_group.myterraformgroup.name

    tags = {
        environment = "Data Engineering Project"
    }
}

# Create subnet
resource "azurerm_subnet" "myterraformsubnet" {
    name                 = "mySubnet"
    resource_group_name  = azurerm_resource_group.myterraformgroup.name
    virtual_network_name = azurerm_virtual_network.myterraformnetwork.name
    address_prefixes       = ["10.0.1.0/24"]
}

# Create public IPs
resource "azurerm_public_ip" "myterraformpublicip" {
    name                         = "myPublicIP"
    location                     = var.location
    resource_group_name          = azurerm_resource_group.myterraformgroup.name
    allocation_method            = "Static"

    tags = {
        environment = "Data Engineering Project"
    }
}

data "azurerm_public_ip" "terraform_azure_public_id" {
  name                = azurerm_public_ip.myterraformpublicip.name
  resource_group_name = azurerm_public_ip.myterraformpublicip.resource_group_name
}

output "public_ip_address" {
  value = data.azurerm_public_ip.terraform_azure_public_id.ip_address
}

# Create Network Security Group and rule
resource "azurerm_network_security_group" "myterraformnsg" {
    name                = "myNetworkSecurityGroup"
    location            = var.location
    resource_group_name = azurerm_resource_group.myterraformgroup.name

    security_rule {
        name                       = "SSH"
        priority                   = 1001
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = "22"
        source_address_prefix      = "*"
        destination_address_prefix = "*"
    }

    tags = {
        environment = "Data Engineering Project"
    }
}

# Create network interface
resource "azurerm_network_interface" "myterraformnic" {
    name                      = "myNIC"
    location                  = var.location
    resource_group_name       = azurerm_resource_group.myterraformgroup.name

    ip_configuration {
        name                          = "myNicConfiguration"
        subnet_id                     = azurerm_subnet.myterraformsubnet.id
        private_ip_address_allocation = "Dynamic"
        public_ip_address_id          = azurerm_public_ip.myterraformpublicip.id
    }

    tags = {
        environment = "Data Engineering Project"
    }
}

# Connect the security group to the network interface
resource "azurerm_network_interface_security_group_association" "example" {
    network_interface_id      = azurerm_network_interface.myterraformnic.id
    network_security_group_id = azurerm_network_security_group.myterraformnsg.id
}

# Generate random text for a unique storage account name
resource "random_id" "randomId" {
    keepers = {
        # Generate a new ID only when a new resource group is defined
        resource_group = azurerm_resource_group.myterraformgroup.name
    }

    byte_length = 4
}

# Create storage account for boot diagnostics
resource "azurerm_storage_account" "mystorageaccount" {
    name                        = "storage${random_id.randomId.hex}"
    resource_group_name         = azurerm_resource_group.myterraformgroup.name
    location                    = var.location
    account_tier             = "Standard"
    account_replication_type = "LRS"
    account_kind             = "StorageV2"
    is_hns_enabled           = "true"

    tags = {
        environment = "Data Engineering Project"
    }
}

resource "azurerm_storage_container" "storage_container" {
  name                  = "data-lake"
  storage_account_name  = azurerm_storage_account.mystorageaccount.name
  container_access_type = "private"
}

resource "azurerm_storage_share" "sharedstorage" {
  name                 = "sharedstorage"
  storage_account_name = azurerm_storage_account.mystorageaccount.name
  quota                = 50

  acl {
    id = "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI"

    access_policy {
      permissions = "rwdl"
      start       = "2019-07-02T09:38:21.0000000Z"
      expiry      = "2019-07-02T10:38:21.0000000Z"
    }
  }

}

resource "azurerm_storage_share_file" "dockerfile" {
    name             = "Dockerfile"
    storage_share_id = azurerm_storage_share.sharedstorage.id
    source           = "../airflow/Dockerfile"
}
resource "azurerm_storage_share_file" "entrypoint" {
    name             = "entrypoint.sh"
    storage_share_id = azurerm_storage_share.sharedstorage.id
    source           = "../airflow/scripts/entrypoint.sh"
}
resource "azurerm_storage_share_file" "setup" {
    name             = "setup.sh"
    storage_share_id = azurerm_storage_share.sharedstorage.id
    source           = "../scripts/setup.sh"
}
resource "azurerm_storage_share_file" "docker-compose" {
    name             = "docker-compose.yml"
    storage_share_id = azurerm_storage_share.sharedstorage.id
    source           = "../airflow/docker-compose.yml"
}
resource "azurerm_storage_share_file" "airflow-env" {
    name             = "airflow.env"
    storage_share_id = azurerm_storage_share.sharedstorage.id
    source           = "../airflow/airflow.env"
}
resource "azurerm_storage_share_file" "upload-files-dag" {
    name             = "upload_files_dag.py"
    storage_share_id = azurerm_storage_share.sharedstorage.id
    source           = "../airflow/dags/upload_files_dag.py"
}

resource "tls_private_key" "linux_key" {
  algorithm = "RSA"
  rsa_bits = 4096
}

# We want to save the private key to our machine
# We can then use this key to connect to our Linux VM

resource "local_file" "linuxkey" {
  filename = var.ssh-path  
  content=tls_private_key.linux_key.private_key_pem 
}


# Create Cosmos DB to operate as a Data Warehouse

resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

resource "azurerm_cosmosdb_account" "db" {
  name                = "cosmos-db-${random_integer.ri.result}"
  location            = var.cosmos-location
  resource_group_name = azurerm_resource_group.myterraformgroup.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  enable_automatic_failover = true

  capabilities {
    name = "EnableServerless"
  }

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }

  geo_location {
    location          = var.cosmos-location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_sql_database" "wine-database" {
  name                = "wine-data-database"
  resource_group_name = azurerm_resource_group.myterraformgroup.name
  account_name        = azurerm_cosmosdb_account.db.name

  depends_on = [azurerm_cosmosdb_account.db]
}

resource "azurerm_cosmosdb_sql_container" "sql-container" {
  name                  = "wine-data-container"
  resource_group_name = azurerm_resource_group.myterraformgroup.name
  account_name        = azurerm_cosmosdb_account.db.name
  database_name         = azurerm_cosmosdb_sql_database.wine-database.name
  partition_key_path    = "/id"

  indexing_policy {
    indexing_mode = "Consistent"

    included_path {
      path = "/*"
    }

    included_path {
      path = "/included/?"
    }

    excluded_path {
      path = "/excluded/?"
    }
  }

  unique_key {
    paths = ["/idlong", "/idshort"]
  }
}

# Create virtual machine
resource "azurerm_linux_virtual_machine" "myterraformvm" {
    name                  = var.project
    location              = var.location
    resource_group_name   = azurerm_resource_group.myterraformgroup.name
    network_interface_ids = [azurerm_network_interface.myterraformnic.id]
    size                  = "Standard_DS2"

    os_disk {
        name              = "myOsDisk"
        caching           = "ReadWrite"
        storage_account_type = "Premium_LRS"
    }

    source_image_reference {
        publisher = "Canonical"
        offer     = "UbuntuServer"
        sku       = "18.04-LTS"
        version   = "latest"
    }

    computer_name  = "myvm"
    admin_username = "azureuser"
    disable_password_authentication = true

    admin_ssh_key {
        username       = "azureuser"
        public_key     = tls_private_key.linux_key.public_key_openssh
    }

    boot_diagnostics {
        storage_account_uri = azurerm_storage_account.mystorageaccount.primary_blob_endpoint
    }

    tags = {
        environment = "Data Engineering Project"
    }

    depends_on = [tls_private_key.linux_key]
}
