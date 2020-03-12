#!/bin/bash

function run()
{
    docker-compose up --build
}

echo "Bitcoin-Wallet Server Docker Compose Starting...."
run;
