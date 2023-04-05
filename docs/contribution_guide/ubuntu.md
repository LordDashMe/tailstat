# Ubuntu

## Work with the API

- Install debian dependencies

  ```sh
  $ apt-get install gcc libc-dev linux-headers-generic nginx python3 python3-pip
  ```

- Install TailStat

  ```sh
  $ /var/tailstat/scripts/install
  ```

- Install TailStat dev dependecies

  ```sh
  $ /var/tailstat/scripts/install_dev
  ```

- Enable development mode on `/etc/tailstat.conf`

  ```
  development = 1
  ```

- Up the API service

  ```
  $ /var/tailstat/scripts/up
  ```

- Access it via `http://127.0.0.0:10000` or `http://localhost:10000` 

## Work with the Dashboard

- Node version required is `18.x.x`

- Install the essential packges for node `g++ make py3-pip` before running the npm install.

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

- Access it via `http://127.0.0.0:10001/` or `http://localhost:10001/` 
