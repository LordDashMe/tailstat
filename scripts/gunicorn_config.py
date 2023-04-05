import configparser

tsConf = configparser.ConfigParser()
tsConf.read("/etc/tailstat.conf")
tsConf = tsConf["DEFAULT"]

tailStatRootPath = tsConf.get("root_path")
tailStatIsDevelopment = tsConf.getboolean("development")

# Default config
chdir = f"{tailStatRootPath}tailstat/"
wsgi_app = "tailstat_api:app"
workers = 2
worker_class = "uvicorn.workers.UvicornWorker"
bind = "0.0.0.0:8000"

# Logging config
capture_output = True
errorlog = f"{tailStatRootPath}tmp/tailstat-error.log"

if tailStatIsDevelopment:
    reload = True
    loglevel = "debug"
