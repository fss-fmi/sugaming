resource "vercel_project" "vercel_site" {
  name      = "sugaming-site"
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = "fss-fmi/sugaming"
    production_branch = "main"
  }

  build_command    = "yarn nx build sugaming-site --prod"
  output_directory = "dist/apps/sugaming-site/.next"
  install_command  = "yarn install"
}
