terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }

    github = {
      source  = "integrations/github"
      version = "~> 5.0"
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
  team = "fss-fmi"
}

provider "github" {
  owner = "fss-fmi"
}
