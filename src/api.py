import configparser
from fastapi import FastAPI

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

ROOT_PATH = config["DEFAULT"].get("ROOT_PATH")
TEMP_PATH = f"{ROOT_PATH}tmp/"

app = FastAPI()


@app.post("/generate/report")
def create_generate_report_flag():

    try:

        flagFilePath = f"{TEMP_PATH}/generate"
        with open(flagFilePath, 'w') as f:
            f.write()
        return { "message": "ok" }

    except Exception as e:
        print(e)
