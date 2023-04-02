import sys
import psutil
import configparser

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

sys.path.append(config["DEFAULT"].get("ROOT_PATH") + "src/")

import tailstat_utils


def main():
    diskUsage = psutil.disk_usage("/")

    percent = diskUsage.percent
    total = tailstat_utils.convert_byte_to_megabyte(diskUsage.total)
    used = tailstat_utils.convert_byte_to_megabyte(diskUsage.used)

    return { 
        "percent": percent, 
        "total": total, 
        "used": used 
    }
