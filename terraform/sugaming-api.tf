resource "vercel_project" "sugaming-api" {
  name      = "sugaming-api"
  git_repository = {
    type = "github"
    repo = "fss-fmi/sugaming"
    production_branch = "main"
  }
  build_command = "yarn nx build sugaming-api --prod"
  output_directory = "dist/apps/sugaming-api"
  install_command = "yarn install --modules-folder=\"../..\""
  root_directory = "apps/sugaming-api"
}
