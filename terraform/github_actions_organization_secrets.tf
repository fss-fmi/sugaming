resource "github_actions_organization_secret" "tf_api_token_secret" {
  secret_name     = "TF_API_TOKEN"
  visibility      = "all"
  plaintext_value = var.tf_api_token
}

resource "github_actions_organization_secret" "docker_username_secret" {
  secret_name     = "DOCKER_USERNAME"
  visibility      = "all"
  plaintext_value = var.docker_username
}

resource "github_actions_organization_secret" "docker_password_secret" {
  secret_name     = "DOCKER_PASSWORD"
  visibility      = "all"
  plaintext_value = var.docker_password
}

resource "github_actions_organization_secret" "vercel_token_secret" {
  secret_name     = "VERCEL_API_TOKEN"
  visibility      = "all"
  plaintext_value = var.vercel_api_token
}

resource "github_actions_organization_secret" "vercel_org_id_secret" {
  secret_name     = "VERCEL_ORG_ID"
  visibility      = "all"
  plaintext_value = var.vercel_org_id
}

resource "github_actions_organization_secret" "fss_github_token_secret" {
  secret_name     = "FSS_FMI_GITHUB_TOKEN"
  visibility      = "all"
  plaintext_value = var.fss_fmi_github_token
}

resource "github_actions_organization_secret" "sugaming_api_production_public_ip_secret" {
  secret_name     = "SUGAMING_API_PRODUCTION_PUBLIC_IP"
  visibility      = "all"
  plaintext_value = var.sugaming_api_production_public_ip
}

resource "github_actions_organization_secret" "sugaming_api_preview_public_ip_secret" {
  secret_name = "SUGAMING_API_PREVIEW_PUBLIC_IP"
  visibility = "all"
  plaintext_value = var.sugaming_api_preview_public_ip
}

resource "github_actions_organization_secret" "sugaming_api_production_ssh_user_secret" {
  secret_name = "SUGAMING_API_PRODUCTION_SSH_USER"
  visibility = "all"
  plaintext_value = var.sugaming_api_production_ssh_user
}

resource "github_actions_organization_secret" "sugaming_api_preview_ssh_user_secret" {
  secret_name = "SUGAMING_API_PREVIEW_SSH_USER"
  visibility = "all"
  plaintext_value = var.sugaming_api_preview_ssh_user
}

resource "github_actions_organization_secret" "sugaming_api_production_ssh_password_secret" {
  secret_name = "SUGAMING_API_PRODUCTION_SSH_PASSWORD"
  visibility = "all"
  plaintext_value = var.sugaming_api_production_ssh_password
}

resource "github_actions_organization_secret" "sugaming_api_preview_ssh_password_secret" {
  secret_name = "SUGAMING_API_PREVIEW_SSH_PASSWORD"
  visibility = "all"
  plaintext_value = var.sugaming_api_preview_ssh_password
}

resource "github_actions_organization_secret" "sugaming_api_production_nginx_proxy_manager_email_secret" {
  secret_name = "SUGAMING_API_PRODUCTION_NGINX_PROXY_MANAGER_EMAIL"
  visibility = "all"
  plaintext_value = var.sugaming_api_production_nginx_proxy_manager_email
}

resource "github_actions_organization_secret" "sugaming_api_preview_nginx_proxy_manager_email_secret" {
  secret_name = "SUGAMING_API_PREVIEW_NGINX_PROXY_MANAGER_EMAIL"
  visibility = "all"
  plaintext_value = var.sugaming_api_preview_nginx_proxy_manager_email  
}

resource "github_actions_organization_secret" "sugaming_api_production_nginx_proxy_manager_password_secret" {
  secret_name = "SUGAMING_API_PRODUCTION_NGINX_PROXY_MANAGER_PASSWORD"
  visibility = "all"
  plaintext_value = var.sugaming_api_production_nginx_proxy_manager_password
}

resource "github_actions_organization_secret" "sugaming_api_preview_nginx_proxy_manager_password_secret" {
  secret_name = "SUGAMING_API_PREVIEW_NGINX_PROXY_MANAGER_PASSWORD"
  visibility = "all"
  plaintext_value = var.sugaming_api_preview_nginx_proxy_manager_password
}
