#!/bin/bash

docker context use pihome

docker-compose down

docker-compose up --build -d