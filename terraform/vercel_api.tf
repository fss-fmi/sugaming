resource "vercel_project" "vercel_api" {
  name = "sugaming-api"

  git_repository = {
    type              = "github"
    repo              = "fss-fmi/sugaming"
    production_branch = "release-placeholder"
  }

  build_command    = "yarn prisma migrate deploy && yarn prisma generate && yarn nx build sugaming-api --prod"
  output_directory = "../../dist/apps/sugaming-api"
  install_command  = "yarn install"
  root_directory   = "apps/sugaming-api"
}
