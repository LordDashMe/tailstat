#!/bin/sh

echo 'Starting tailstat API'
gunicorn --chdir /var/tailstat/src api:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
