#!/bin/sh

echo 'Shutting down tailstat API'
killall -9 gunicorn
sleep 1
