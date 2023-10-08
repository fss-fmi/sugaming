resource "github_repository" "github_repository" {
  name        = "sugaming"
  description = "Tournament management platform for the Sofia University Gaming club. 🎮"

  visibility = "public"

  has_issues      = true
  has_projects    = true
  has_wiki        = true
  has_discussions = false
}

resource "github_repository" "github_secrets_repository" {
  name        = "secrets"
  description = "FSS of FMI Organizational Secrets"

  visibility = "public"

  has_issues      = false
  has_projects    = false
  has_wiki        = false
  has_discussions = false
}
