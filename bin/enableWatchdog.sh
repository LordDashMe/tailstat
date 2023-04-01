#!/bin/bash

echo "Enabling tailstat watchdog"

if crontab -l | grep --quiet "/var/tailstat/bin/gen_report_with_validation.py"; then
    echo " - watchdog for gen_report_with_validation.py already configured"
else
    crontab -l | { cat; echo "* * * * * python3 /var/tailstat/bin/gen_report_with_validation.py"; } | crontab -
fi

if crontab -l | grep --quiet "/var/tailstat/bin/gen_report.py"; then
    echo " - watchdog for gen_report.py already configured"
else
    crontab -l | { cat; echo "10 * * * * python3 /var/tailstat/bin/gen_report.py"; } | crontab -
fi
