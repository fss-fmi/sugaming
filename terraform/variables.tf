variable "tf_api_token" {
  description = "Terraform Cloud API token"
  type        = string
  sensitive   = true
}

variable "docker_username" {
  description = "Docker Hub username"
  type        = string
  sensitive   = true
}

variable "docker_password" {
  description = "Docker Hub password"
  type        = string
  sensitive   = true
}

variable "vercel_api_token" {
  description = "Vercel API token"
  type        = string
  sensitive   = true
}

variable "vercel_org_id" {
  description = "Vercel organization ID"
  type        = string
  sensitive   = false
}

variable "vercel_project_site_id" {
  description = "Vercel sugaming-site project ID"
  type        = string
  sensitive   = false
}

variable "vercel_project_admin_id" {
  description = "Vercel sugaming-admin project ID"
  type        = string
  sensitive   = false
}

variable "fss_fmi_github_token" {
  description = "GitHub API token for the fss-fmi-admin account"
  type        = string
  sensitive   = true
}

variable "sugaming_api_production_public_ip" {
  description = "Public IP address of the sugaming-api production server"
  type        = string
  sensitive   = false
}

variable "sugaming_api_preview_public_ip" {
  description = "Public IP address of the sugaming-api preview server"
  type        = string
  sensitive   = false
}

variable "sugaming_api_production_ssh_user" {
  description = "SSH user for the sugaming-api production server"
  type        = string
  sensitive   = false
}

variable "sugaming_api_preview_ssh_user" {
  description = "SSH user for the sugaming-api preview server"
  type        = string
  sensitive   = false
}

variable "sugaming_api_production_ssh_password" {
  description = "SSH password for the sugaming-api production server"
  type        = string
  sensitive   = true
}

variable "sugaming_api_preview_ssh_password" {
  description = "SSH password for the sugaming-api preview server"
  type        = string
  sensitive   = true
}

variable "sugaming_api_production_nginx_proxy_manager_email" {
  description = "Email address for the Nginx Proxy Manager admin user"
  type        = string
  sensitive   = false
}

variable "sugaming_api_preview_nginx_proxy_manager_email" {
  description = "Email address for the Nginx Proxy Manager admin user"
  type        = string
  sensitive   = false
}

variable "sugaming_api_production_nginx_proxy_manager_password" {
  description = "Password for the Nginx Proxy Manager admin user"
  type        = string
  sensitive   = true
}

variable "sugaming_api_preview_nginx_proxy_manager_password" {
  description = "Password for the Nginx Proxy Manager admin user"
  type        = string
  sensitive   = true
}

variable "sugaming_discord_production_public_ip" {
  description = "Public IP address of the sugaming-discord production server"
  type        = string
  sensitive   = false
}

variable "sugaming_discord_preview_public_ip" {
  description = "Public IP address of the sugaming-discord preview server"
  type        = string
  sensitive   = false
}

variable "sugaming_discord_production_ssh_user" {
  description = "SSH user for the sugaming-discord production server"
  type        = string
  sensitive   = false
}

variable "sugaming_discord_preview_ssh_user" {
  description = "SSH user for the sugaming-discord preview server"
  type        = string
  sensitive   = false
}

variable "sugaming_discord_production_ssh_password" {
  description = "SSH password for the sugaming-discord production server"
  type        = string
  sensitive   = true
}

variable "sugaming_discord_preview_ssh_password" {
  description = "SSH password for the sugaming-discord preview server"
  type        = string
  sensitive   = true
}