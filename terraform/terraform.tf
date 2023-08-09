terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
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
