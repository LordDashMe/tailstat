import sys
import configparser

config = configparser.ConfigParser()
config.read("/etc/tailstat.conf")

sys.path.append(config["DEFAULT"].get("ROOT_PATH") + "src/")

import tailstat_utils


def test_tailstat_utils():
    assert (tailstat_utils.convert_byte_to_megabyte(1000000) == 1)
