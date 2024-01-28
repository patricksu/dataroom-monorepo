# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.0"
    }
  }
  required_version = ">= 0.14.9"
}
provider "azurerm" {
  subscription_id = "21144ce4-dd6f-45d7-b31c-db144b67e190"
  features {}
}

# Generate a random integer to create a globally unique name
resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

# Create the resource group
resource "azurerm_resource_group" "rg" {
  name     = "data-room-resource-group-${random_integer.ri.result}"
  location = "westus2"
}

# Create the backend Service Plan
resource "azurerm_service_plan" "backend" {
  name                = "backend-service-plan-${random_integer.ri.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

data "azurerm_key_vault" "dataroom" {
  name                = "data-room"
  resource_group_name = "data-room"
}

data "azurerm_key_vault_secret" "db_url" {
  name         = "DB-URL"
  key_vault_id = data.azurerm_key_vault.dataroom.id
}


# Create the backend, pass in the Service Plan ID
resource "azurerm_linux_web_app" "backend" {
  name                  = "data-room-backend-${random_integer.ri.result}"
  location              = azurerm_resource_group.rg.location
  resource_group_name   = azurerm_resource_group.rg.name
  service_plan_id       = azurerm_service_plan.backend.id
  https_only            = true
  app_settings          = {
    "DATABASE_URL" = data.azurerm_key_vault_secret.db_url.value
  }
  site_config {
    minimum_tls_version = "1.2"
    always_on           = true
    application_stack {
        docker_image        = "registry.hub.docker.com/mightycontainer/app-backend-prod"
        docker_image_tag    = "latest"
    }
  }
}

# Create the frontend Service Plan
resource "azurerm_service_plan" "frontend" {
  name                = "frontend-service-plan-${random_integer.ri.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

# Create the frontend, pass in the Service Plan ID
resource "azurerm_linux_web_app" "frontend" {
  name                  = "data-room-frontend-${random_integer.ri.result}"
  location              = azurerm_resource_group.rg.location
  resource_group_name   = azurerm_resource_group.rg.name
  service_plan_id       = azurerm_service_plan.frontend.id
  https_only            = true
  app_settings          = {
    "REACT_APP_API_BASE_URL" = azurerm_linux_web_app.backend.default_hostname 
  }
  site_config {
    minimum_tls_version = "1.2"
    always_on           = true
    application_stack {
        docker_image   = "registry.hub.docker.com/mightycontainer/app-frontend-prod"
        docker_image_tag    = "latest"
    }
  }
}