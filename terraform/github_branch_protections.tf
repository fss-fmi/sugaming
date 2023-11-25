resource "github_branch_protection_v3" "main_branch_protection" {
  repository     = github_repository.github_repository.name
  branch         = "main"
  enforce_admins = false

  required_status_checks {
    strict = true
    checks = [
      "Vercel – sugaming-api:8329",
      "Vercel – sugaming-site:8329",
      "Vercel – sugaming-admin:8329",
      "Continuous Integration:15368",
      "Build and Publish container images:15368"
    ]
  }

  required_pull_request_reviews {
    dismiss_stale_reviews      = false
    require_code_owner_reviews = true
  }
}
