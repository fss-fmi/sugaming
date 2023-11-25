# Developer Onboarding

This manual should serve you as a starting point for contributing to the SUGAMING platform. It showcases the general project structure, tools, and steps for setting up a local development environment, etc. Whether you are a seasoned developer of the platform or you are just poking around the codebase - your contributions are welcomed and appreciated! 💖

### Table of contents

1. [Project Overview](#-project-overview)
2. [Environment Variables](#-environment-variables)
3. [Tools Required](#-tools-required)
4. [Development Setup](#-development-setup)
5. [IDE Setup](#-ide-setup)

---

## 🔎 Project Overview

The project consists of 3 main components:

- `sugaming-api`, for handling data access, user login, tournament, and match creation, game server creation, etc. (located in [apps/sugaming-api](../blob/main/apps/sugaming-api))
- `sugaming-site`, for user interaction with the platform (located in [apps/sugaming-site](../blob/main/apps/sugaming-site))
- `sugaming-admin`, for administering tournaments, matches and platform users (located in [apps/sugaming-admin](../blob/main/apps/sugaming-admin))

## ⚙ Environment Variables

If you want to run the project locally you will be required to set environment variables such as database connection strings, API keys, etc. A template containing all the environment variables needed to be set is available in [.env.template](../blob/main/.env.template).

In addition, apps in the mono-repo may have additional environment variables, applicable exclusively to them. Templates for such variables can be found in `apps/<application name>/.env.template`. Please note that if such a file does not exist, that simply means the application does not require any additional configuration apart from the common between all packages.

If you are a part of the project development team, you can refer to [this secret store](https://www.youtube.com/watch?v=iik25wqIuFo) for complete configurations.

## 🔨 Tools Required

To get started with development on this project, several tools need to be set up beforehand.

| Name              | Description                                                                                                                                                                                                      | Installation                                                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node20            | `Node.js` is an open-source, cross-platform JavaScript runtime environment.<br>This project uses the Node.js 20 runtime environment.                                                                             | On Linux, macOS, and Windows, Using `nvm` (recommended):<br>`nvm install 20 --lts`<br>`nvm use 20`<br><br>On Linux, macOS and Windows, Manual installation:<br>https://nodejs.org/en/download/package-manager |
| nvm<br>(optional) | `nvm` or Node Version Manager is a tool for installing and using different versions of Node.js via the command line.<br>In this project, it is used for installing Node.js 20. (refer to the previous tool)      | On Linux and macOS:<br>https://github.com/nvm-sh/nvm#installing-and-updating<br><br>On Windows:<br>https://github.com/coreybutler/nvm-windows/releases                                                        |
| yarn              | `yarn` is an open-source JavaScript package manager.<br>It is used for installing the project dependencies specified in `package.json` and `yarn.lock`.                                                          | On Linux, macOS and Windows:<br>`npm i -g yarn`                                                                                                                                                               |
| terraform         | `terraform` is an infrastructure as a code tool that is used for provisioning and managing cloud infrastructure.<br>In this project, it is used for managing Vercel resources and the project GitHub repository. | On Linux, macOS, Windows:<br>https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli                                                                                                  |

## 👨‍💻 Project Development Setup

To setup the project for local development, complete the following steps:

1. Clone the project git repository.

```
git clone https://github.com/fss-fmi/sugaming
```

2. Install project dependencies.

```
yarn install
```

3. Start project applications locally.
   To start a specific application, run the following command:

```
yarn nx serve <application name>
```

If you wish to start all the mono-repo projects, run the following command:

```
yarn nx run-many -t serve --all
```

## ⌨️ IDE Setup

TODO
