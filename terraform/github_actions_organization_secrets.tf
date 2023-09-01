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

resource "github_actions_organization_secret" "documentation_sync_github_token_secret" {
  secret_name     = "DOCUMENTATION_SYNC_GITHUB_TOKEN"
  visibility      = "all"
  plaintext_value = var.documentation_sync_github_token
}
