#!/usr/bin/python3

import os
import sys
import configparser

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

ROOT_PATH = config["DEFAULT"].get("ROOT_PATH")
TEMP_PATH = f"{ROOT_PATH}tmp/"

sys.path.append(f"{ROOT_PATH}bin/")

import gen_report


if __name__ == "__main__":

    flagFilePath = f"{TEMP_PATH}/generate"

    if os.path.isfile(flagFilePath):
        gen_report.main()
        os.remove(flagFilePath)
