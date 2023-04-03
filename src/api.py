import sys
import configparser
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

ROOT_PATH = config["DEFAULT"].get("ROOT_PATH")

sys.path.append(f"{ROOT_PATH}bin/")

import tailstat

app = FastAPI()

origins = [
    "http://localhost:10001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/report/sync")
def report_sync():
    try:
        tailstat.main()
        return { "message": "ok" }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={ "message": "Something is wrong, please try again later." })
