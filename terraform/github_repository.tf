resource "github_repository" "github_repository" {
  name        = "sugaming"
  description = "Tournament management platform for the Sofia University Gaming club. 🎮"

  visibility = "public"

  has_issues      = true
  has_projects    = true
  has_wiki        = true
  has_discussions = false
}
