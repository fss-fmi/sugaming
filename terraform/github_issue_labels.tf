resource "github_issue_label" "feature_label" {
  repository  = github_repository.github_repository.name
  name        = "feature"
  description = "New feature or request"
  color       = "A2EEEF"
}

resource "github_issue_label" "bug_label" {
  repository  = github_repository.github_repository.name
  name        = "bug"
  description = "Something isn't working"
  color       = "D73A4A"
}

resource "github_issue_label" "deployment_label" {
  repository  = github_repository.github_repository.name
  name        = "deployment"
  description = "Request regarding the project deployment"
  color       = "F777D1"
}

resource "github_issue_label" "test_label" {
  repository  = github_repository.github_repository.name
  name        = "test"
  description = "Tasks regarding project testing"
  color       = "0E8A16"
}

resource "github_issue_label" "question_label" {
  repository  = github_repository.github_repository.name
  name        = "question"
  description = "Further information is requested"
  color       = "D876E3"
}

resource "github_issue_label" "documentation_label" {
  repository  = github_repository.github_repository.name
  name        = "documentation"
  description = "Improvements or additions to documentation"
  color       = "0075CA"
}

resource "github_issue_label" "api_label" {
  repository  = github_repository.github_repository.name
  name        = "api"
  description = "Tasks regarding the backend API"
  color       = "5319E7"
}

resource "github_issue_label" "site_label" {
  repository  = github_repository.github_repository.name
  name        = "site"
  description = "Tasks regarding the frontend client"
  color       = "2E9CFD"
}

resource "github_issue_label" "admin_label" {
  repository  = github_repository.github_repository.name
  name        = "admin"
  description = "Tasks regarding the admin panel"
  color       = "FFA500"
}
