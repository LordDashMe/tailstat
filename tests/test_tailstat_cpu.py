import sys
import configparser

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

sys.path.append(config["DEFAULT"].get("root_path") + "tailstat/")

import tailstat_cpu


def test_tailstat_cpu():
    cpu = tailstat_cpu.main()

    assert (True if "percent" in cpu else False)
    assert (True if "count" in cpu else False)
