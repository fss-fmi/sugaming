resource "vercel_project" "vercel_admin" {
  name      = "sugaming-admin"
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = "fss-fmi/sugaming"
    production_branch = "release-placeholder"
  }

  build_command    = "yarn nx build sugaming-admin --prod"
  output_directory = "../../dist/apps/sugaming-admin/.next"
  install_command  = "yarn install --production"
  root_directory   = "apps/sugaming-admin"
}
