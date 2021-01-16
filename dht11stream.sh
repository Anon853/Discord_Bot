#!/bin/bash
echo "==== dht11stream.sh started ===="
sudo chmod 666 /dev/ttyUSB0
echo "==== chmod set ===="
echo "==== writing from serial USB into arduinoData.txt ===="
tail -f /dev/ttyUSB0 > /home/user/Dev/Discord_Bot/arduinoData.txt
