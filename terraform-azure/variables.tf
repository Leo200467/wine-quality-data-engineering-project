variable "project" {
  description = "Azure project name"
  default = "data-engineering-project"
  type = string
}

variable "location" {
  description = "Region for Azure Resources."
  default = "centralus"
  type = string
}

variable "cosmos-location" {
  description = "Region for Azure Cosmos DB."
  default = "westus"
  type = string
}

variable "ssh-path" {
  description = "Path to store local pair SSH key"
  default = "C:/Users/leona/.ssh/linuxkey.pem"
  type = string
}
