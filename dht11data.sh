#!/bin/bash
#
printf "\n==== dht11data.sh started ====\n\n"
terminator -x sh -c /home/user/Dev/Discord_Bot/dht11stream.sh
COUNT=0
while true

        do
                truncate -s 0 arduinoData.txt
		#tail -c +43 arduinoData.txt > arduinoData2.txt
		#echo "==== tail into arduinoData2.txt ===="
		let COUNT++
		echo "==== loop iterations: $COUNT ===="
		sleep 10
	done
