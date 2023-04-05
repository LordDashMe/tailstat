FROM ubuntu:22.04

RUN apt-get update -y && apt-get upgrade -y && \
    # Required dependencies
    apt-get install gcc libc-dev linux-headers-generic nginx python3 python3-pip -y && \
    # Optional
    apt-get install vim -y
