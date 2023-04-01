import sys
import configparser

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

sys.path.append(config["DEFAULT"].get("ROOT_PATH") + "src/")

import tailstat_cpu


def test_tailstat_cpu():
    cpu = tailstat_cpu.main()
    assert (True if "percent" in cpu else False)
    assert (True if "count" in cpu else False)
