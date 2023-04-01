#!/usr/bin/python3

import sys
import json
import configparser
from datetime import datetime

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

ROOT_PATH = config["DEFAULT"].get("ROOT_PATH")
TEMP_PATH = f"{ROOT_PATH}tmp/"

sys.path.append(f"{ROOT_PATH}src/")

import tailstat_cpu
import tailstat_disk
import tailstat_mem


def main():

    output = json.dumps({
        "tailstat": {
            "cpu": tailstat_cpu.main(),
            "disk": tailstat_disk.main(),
            "mem": tailstat_mem.main(),
        },
        "timestamp": str(datetime.now())
    })

    with open(f"{TEMP_PATH}tailstat_data.json", 'w') as f:
        f.write(output)


if __name__ == "__main__":
    main()
