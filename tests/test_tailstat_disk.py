import sys
import configparser

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

sys.path.append(config["DEFAULT"].get("ROOT_PATH") + "src/")

import tailstat_disk


def test_tailstat_disk():
    disk = tailstat_disk.main()

    assert (True if "percent" in disk else False)
    assert (True if "total" in disk else False)
    assert (True if "used" in disk else False)
