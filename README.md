# TailStat

A simple dashboard for basic system monitoring.

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
$ apt-get install gcc libc-dev linux-headers-generic nginx cron python3 python3-pip
```

## Usage

- Download tailstat archived file:

```sh
$ cd /var/
$ wget https://github.com/LordDashMe/tailstat/archive/refs/tags/x.x.x.zip -O tailstat.zip
$ unzip tailstat.zip
```

- To install tailstat, run the command:

```sh
$ /var/tailstat/bin/install
```

- Once the tailstat installed, we can now start the API by running the command:

```sh
$ /var/tailstat/bin/up_api
```

- To access the the dashboard page visit <http://localhost:10001/>

- The tailstat API is running under <http://localhost:10000/>

## Development

### Docker Environment

- If you are familiar with Docker you can start immediately by running the docker compose command in the root directory.

```sh
$ docker-compose up -d
```

#### Prepare API

- Navigate to the docker container name `tailstat`.

- Execute the tailstat installer script.

```sh
$ /var/tailstat/bin/install
```

- Execute the tailstat installer dev script.

```sh
$ /var/tailstat/bin/install_dev
```

#### Work with Dashboard

- Navigate to the docker container name `tailstat_dashboard_res`.

- Install the essential packges for node alphine `apk add g++ make py3-pip` before running the npm install.

- Go to the dasboard folder resource and execute npm install.

```sh
cd /var/tailstat/dasboard/res
npm install
```

### Usual Environment

@TODO

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
