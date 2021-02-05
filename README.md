# SOA-Projekat

Simulation of IoT Smart House Application with Zeebe, Camunda, Angular and Node.js Sensors.

How to start:
-you must have Zeebe installed on your machine, Redis installed on your machine.
-go to zeebe directory and run this commands:
1.) cd operate/
2.) docker-compose up
-go to redis directory and run:
1.)./src redis-server
-go to Klijent folder and run ng serve Web Client is on http://localhost:4200
-go to Senzori folder and run in seperate terminals :
1.) npm run deploy-workflows
2.) npm run gateway
3.) npm run centrala
4.) npm run sensors

***********eHouse System should be running now*************
