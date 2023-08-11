resource "github_repository_milestone" "platform_mvp_milestone" {
  owner       = "fss-fmi"
  repository  = github_repository.github_repository.name
  title       = "Platform MVP"
  description = "Most essential features for the launch of the SUGaming platform."
  due_date    = "2023-09-17"
  state       = "open"
}

resource "github_repository_milestone" "public_release_milestone" {
  owner       = "fss-fmi"
  repository  = github_repository.github_repository.name
  title       = "Public release"
  description = "Tasks for the public release of the SUGaming platform."
  due_date    = "2023-10-01"
  state       = "open"
}
