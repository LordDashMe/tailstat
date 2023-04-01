#!/bin/bash

echo "Disabling tailstat watchdog"

crontab -l | grep -v "/var/tailstat/bin/gen_report_with_validation.py" 2>/dev/null | crontab - >/dev/null 2>&1
crontab -l | grep -v "/var/tailstat/bin/gen_report.py" 2>/dev/null | crontab - >/dev/null 2>&1
