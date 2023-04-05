# TailStat

A simple dashboard for basic system monitoring.

## Demo

You can install it on a server or local machine that matches the supported Linux distributions that you want to monitor.

![Dashboard](https://github.com/LordDashMe/tailstat/blob/main/docs/img/dashboard-0.0.1.png?raw=true)

## Tech Stack

- [Python](https://www.python.org/) - is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation via the off-side rule.

- [Nginx](https://www.nginx.com/) - is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

- [psutil](https://psutil.readthedocs.io/en/latest/) - is a cross-platform library for retrieving information on running processes and system utilization (CPU, memory, disks, network, sensors) in Python.

- [FastAPI](https://fastapi.tiangolo.com/) - FastAPI framework, high performance, easy to learn, fast to code, ready for production.

- [uvicorn](https://www.uvicorn.org/) - An ASGI web server, for Python.

- [gunicorn](https://gunicorn.org/) - is a Python WSGI HTTP Server for UNIX. It's a pre-fork worker model. The Gunicorn server is broadly compatible with various web frameworks, simply implemented, light on server resources, and fairly speedy.

## Requirements

- Supported Linux distribution(s):

  - Debian

  - Other coming soon!

- Below are the specific requirements for each Supported Linux distribution:

### Debian

- For debian, make sure to install or have the following packages:

  ```sh
  $ apt-get install gcc libc-dev linux-headers-generic nginx python3 python3-pip
  ```

## Install & Usage

- There are a few steps needed in order to start using Tailstat.

  - Download the tailstat:

    ```sh
    $ cd /var/
    $ wget https://github.com/LordDashMe/tailstat/archive/refs/tags/x.x.x.zip -O tailstat.zip
    $ unzip tailstat.zip
    ```

  - Install the tailstat:

    ```sh
    $ /var/tailstat/scripts/install
    ```

  - Up the tailstat API service:

    ```sh
    $ /var/tailstat/scripts/up
    ```

  - Now you can use TailStat!

    - To access the dashboard page, visit <http://localhost:10001/>

    - Also, if you want to check the API service it is running on, <http://localhost:10000/>

## Contribution

To contribute, please check the following steps on different environments in order to get started.

### With Docker Environment (Recommended)

- If you are familiar with Docker you can start immediately by running the docker compose command in the root directory.

  ```sh
  $ docker-compose up -d
  ```

#### Work with the API

- Navigate to the docker container name `tailstat`.

- Execute the tailstat installer script.

  ```sh
  $ /var/tailstat/scripts/install
  ```

- Execute the tailstat installer dev script.

  ```sh
  $ /var/tailstat/scripts/install_dev
  ```

#### Work with the Dashboard

- Navigate inside the docker container name `tailstat_dashboard_res`.

- Install the essential packges for node alphine `apk add g++ make py3-pip` before running the npm install.

- Go to the dasboard folder resource and execute npm install.

  ```sh
  $ cd /var/tailstat/dasboard/res
  $ npm install
  ```

- To build watch on any file changes:

  ```sh
  $ npm run build:watch
  ```

- You can check more commands in `package.json`

### With Other Environment

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
