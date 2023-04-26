FROM python:3.10.4-slim as builder

RUN apt-get update

RUN apt-get -y install vim postgresql-client make libpq-dev python3-dev gcc

ARG MODE
COPY ["requirements/", "docker/build.sh", "/tmp/"]
RUN sh /tmp/build.sh /tmp/

RUN mkdir /code
WORKDIR /code
ADD . /code
EXPOSE 8000
STOPSIGNAL SIGINT
