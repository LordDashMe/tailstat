import sys
import configparser
from fastapi import FastAPI
from fastapi.responses import JSONResponse

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

ROOT_PATH = config["DEFAULT"].get("ROOT_PATH")

sys.path.append(f"{ROOT_PATH}bin/")

import tailstat

app = FastAPI()


@app.post("/report/sync")
def report_sync():
    try:
        tailstat.main()
        return { "message": "ok" }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={ "message": "Something is wrong, please try again later." })
