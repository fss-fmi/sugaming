This manual should serve you as a starting point for contributing to the SUGAMING platform. It showcases the general project structure, tools, and steps for setting up a local development environment, etc. Whether you are a seasoned developer of the platform or you are just poking around the codebase - your contributions are welcomed and appreciated! 💖

### Table of contents

1. [Project Overview](#-project-overview)
2. [Environment Variables](#-environment-variables)
3. [Tools Required](#-tools-required)
4. [Development Setup](#-development-setup)
5. [IDE Setup](#-ide-setup)
6. [Closing Remarks](#-closing-remarks)

---

## 🔎 Project Overview

The project consists of 3 main components:

- `sugaming-api`, for handling data access, user login, tournament, and match creation, game server creation, etc. (located in [apps/sugaming-api](https://github.com/fss-fmi/sugaming/blob/main/apps/sugaming-api))
- `sugaming-site`, for user interaction with the platform (located in [apps/sugaming-site](https://github.com/fss-fmi/sugaming/blob/main/apps/sugaming-site))
- `sugaming-admin`, for administering tournaments, matches and platform users (located in [apps/sugaming-admin](https://github.com/fss-fmi/sugaming/blob/main/apps/sugaming-admin))

## ⚙ Environment Variables

If you want to run the project locally you will be required to set environment variables such as database connection strings, API keys, etc. A template containing all the environment variables needed to be set is available in [.env.template](https://github.com/fss-fmi/sugaming/blob/main/.env.template).

In addition, apps in the mono-repo may have additional environment variables, applicable exclusively to them. Templates for such variables can be found in `apps/<application name>/.env.template`. Please note that if such a file does not exist, that simply means the application does not require any additional configuration apart from the common between all packages.

If you are a part of the project development team, you can refer to [this secret store](https://github.com/fss-fmi/secrets/blob/main/) for complete configurations.

## 🔨 Tools Required

To get started with development on this project, several tools need to be set up beforehand.

| Name              | Description                                                                                                                                                                                                      | Installation                                                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node20            | `Node.js` is an open-source, cross-platform JavaScript runtime environment.<br>This project uses the Node.js 20 runtime environment.                                                                             | On Linux, macOS, and Windows, Using `nvm` (recommended):<br>`nvm install 20 --lts`<br>`nvm use 20`<br><br>On Linux, macOS and Windows, Manual installation:<br>https://nodejs.org/en/download/package-manager |
| nvm<br>(optional) | `nvm` or Node Version Manager is a tool for installing and using different versions of Node.js via the command line.<br>In this project, it is used for installing Node.js 20. (refer to the previous tool)      | On Linux and macOS:<br>https://github.com/nvm-sh/nvm#installing-and-updating<br><br>On Windows:<br>https://github.com/coreybutler/nvm-windows/releases                                                        |
| pnpm              | `pnpm` is an open-source JavaScript package manager.<br>It is used for installing the project dependencies specified in `package.json` and `pnpm-lock.yaml`.                                                     | On Linux, macOS and Windows:<br>`npm i -g pnpm`                                                                                                                                                               |
| terraform         | `terraform` is an infrastructure as a code tool that is used for provisioning and managing cloud infrastructure.<br>In this project, it is used for managing Vercel resources and the project GitHub repository. | On Linux, macOS, Windows:<br>https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli                                                                                                  |

## 👨‍💻 Development Setup

To set up the project for local development, complete the following steps:

1. **Clone the project git repository.**

```shell
git clone https://github.com/fss-fmi/sugaming
cd sugaming
```

2. **Install the project dependencies.**

```shell
pnpm install
```

> [!NOTE]
> On Windows, if you are experiencing `module not found @nrwl\nx-win32-x64-msvc\nx.win32-x64-msvc.node` errors during the dependencies installation, please refer to [this comment](https://github.com/lerna/lerna/issues/3612#issuecomment-1495469808) for a solution.

3. **Get environment files.**

Make sure to set up the `.env` environment files in the working project directory. For more information, refer to the [Environment Variables section](#-environment-variables).

4. **Set up the local database instance.**

This can be accomplished in 2 ways:

- **Via Docker**

  If you don't have Docker installed on your machine, follow the instructions listed on the [official Docker documentation](https://docs.docker.com/engine/install/) website.

  Then make sure the Docker engine is started.

  - For Windows installations, make sure the `Docker Desktop` application is running.
  - For Linux and macOS installations, refer to [this article](https://docs.docker.com/config/daemon/start/).

  Afterward, from the project directory, start the database using `docker-compose`.

  ```shell
  docker-compose up -d database
  ```

  After this, the database should be up and running, and you should be able to connect to it.

- **Via PostgreSQL local installation**

  If you have not installed it already, get the PostgreSQL database server installer, by visiting the following [download page](https://www.postgresql.org/download/).

  Then start the installation, using the files you downloaded. During the installation, you will have to configure a connection `password` and `port`. Use the ones listed in the `.env` file:

  - `password`: postgres
  - `port`: 5432

  Alternatively, modify the `DATABASE_URL` and `DATABASE_DIRECT_URL` variable values in the `.env` file to reflect your changes.

  After the installation completes, make sure you start the `postgresql` service on your machine.

  - For Windows installations open `services.msc` (from the start menu or the `Win + R` run box), search for `postgresql-x64-xx` in the services list, right-click it, and select `Start`.
  - For Linux and macOS installations, refer to [this article](https://www.postgresql.org/docs/current/server-start.html).

  Afterward, the database should be up and running, and you should be able to connect to it.

> [!NOTE]
> By default, new PostgreSQL server installations only have a single, default database, called `postgres`. The development environment file - `.env` specifies that the database name is `sugaming`. Make sure to either create an empty database with the name `sugaming` or modify the `DATABASE_URL` and `DATABASE_DIRECT_URL` variable values to have `postgres` as the database name.
>
> You can use the bundled `pgAdmin4` or any compatible other database management tool (such as `DBeaver`) to create new or manage existing databases.

5. **Start project applications locally.**

To start a specific application, run the following command:

```shell
pnpm nx serve <application name>
```

If you wish to start all the mono-repo projects, run this command:

```shell
pnpm nx run-many -t serve --all
```

## ⌨️ IDE Setup

Development work on the SUGAMING project is easier in an IDE. In this part of the guide, the setup steps for 2 popular IDEs will be provided - JetBrains WebStorm and Visual Studio Code.

- **JetBrains WebStorm**

  You can load the project repository just as it is in WebStorm, however, several plugins are recommended to be installed, in order to make your developer experience smoother.

  To set up the recommended plugins, first open the cloned project repository in WebStorm. A pop-up in the bottom-right corner stating that "Required plugins have not been loaded" should appear (if you miss it, you can still view it from the "Notifications" pane in the top-right corner). Select `Install required plugins` and then, in the new window that is opened, click `OK`. You may be prompted to accept the plugins' terms of service. Afterward, you should be all set!

  https://github.com/fss-fmi/sugaming/assets/26301867/8d65307a-22f4-475c-9506-1a10ac317e98

  If you wish to run any of the project targets (for ex. serving the `sugaming-api` application) you can do so from the Nx Console, located on the left pane of WebStorm. From there find the project target that you wish to run and double-click it.

  After the first run, the target will be added to your "Run / Debug Configurations" list (in the top pane). This means that in the future, you can start/stop/debug it without going to the Nx Console.

  https://github.com/fss-fmi/sugaming/assets/26301867/00b10ba7-e630-422d-9c06-baa7ff5a966e

> [!NOTE]
> The instructions listed are applicable to WebStorm and other JetBrains IDEs.

- **Visual Studio Code**

  To set up the recommended plugins, first open the cloned project repository in Visual Studio Code and when a pop-up in the bottom-right corner suggests the installation of recommended plugins, click on `Install`. After the installation is completed, you should be ready to go!

  https://github.com/fss-fmi/sugaming/assets/26301867/24bc8c06-61d5-4738-bf88-e1bbeb527f0d

  If you wish to run any of the project targets (for ex. serving the `sugaming-api` application) you can do so from the Nx Console, located on the left pane. From there find the project target that you wish to run and click on `Execute task`.

  https://github.com/fss-fmi/sugaming/assets/26301867/41182689-3685-4a3f-8885-9685cdfc913f

## 🔚 Closing Remarks

Congratulations on completing this guide. Now you should have the SUGAMING project set up locally. If you have questions or need help, reach out to anyone on the team.

> [!IMPORTANT]
> If you experience any issues during the project setup, make sure to post them in the [Project Setup Q&A](https://github.com/fss-fmi/sugaming/discussions/categories/project-setup-q-a) discussions form and contact the project maintainers. This way we can both help you out and document the problem, in case anyone else comes across it.

Happy coding! ❤️
