resource "vercel_project" "vercel_admin" {
  name      = "sugaming-admin"
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = "fss-fmi/sugaming"
    production_branch = "release-placeholder"
  }

  build_command    = "pnpm prisma migrate deploy && pnpm prisma generate && pnpm nx build sugaming-admin --prod"
  output_directory = "../../dist/apps/sugaming-admin/.next"
  install_command  = "pnpm install"
  root_directory   = "apps/sugaming-admin"
}
