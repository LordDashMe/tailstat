import sys
import psutil
import configparser

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

sys.path.append(config["DEFAULT"].get("ROOT_PATH") + "src/")

import tailstat_utils


def main():
    mem = psutil.virtual_memory()

    percent = mem.percent
    total = tailstat_utils.convert_byte_to_megabyte(mem.total)
    used = tailstat_utils.convert_byte_to_megabyte(mem.used)

    return { 
        "percent": percent, 
        "total": total, 
        "used": used 
    }
