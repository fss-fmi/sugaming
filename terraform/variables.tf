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

variable "vercel_project_api_id" {
  description = "Vercel sugaming-api project ID"
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
