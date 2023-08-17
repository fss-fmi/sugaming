resource "vercel_project" "vercel_api" {
  name = "sugaming-api"

  git_repository = {
    type              = "github"
    repo              = "fss-fmi/sugaming"
    production_branch = "release-placeholder"
  }

  root_directory   = "apps/sugaming-api"
}
