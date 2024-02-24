terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "1.1.0"
    }

    github = {
      source  = "integrations/github"
      version = "6.0.0"
    }
  }

  backend "remote" {
    organization = "fss-fmi"

    workspaces {
      name = "sugaming"
    }
  }
}

provider "vercel" {
  # Optional: Set your Vercel team if you want to deploy to a specific team
  team = "fss-fmi"
}

provider "github" {
  # Optional: Set your GitHub owner if you want to interact with repositories under a specific organization
  owner = "fss-fmi"
}
