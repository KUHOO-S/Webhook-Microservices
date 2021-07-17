# Webhook-Microservices

## Table of Contents
* [Introduction](#introduction)
* [Working](#working)
* [Testing](#testing)
* [Installation](#installation)
* [References](#references)

## Introduction:
A Simple **Webhooks Microservice** backend built using [Moleculer](https://moleculer.services/) and [ExpressJs](https://expressjs.com/).

### NodeJS • Express • Moleculer • Webhooks	• Microservices	• Scaling	• Docker

## Working
The following routes are functional :

```/admin/register``` &emsp;-&emsp; Takes input of Url and invokes the register action of the webhook microservice to add data to the database

```/admin/list``` &emsp;&emsp;&emsp;-&emsp; Invokes the list action of the webhook microservice to list all the Urls from the database

```/admin/update``` &emsp;&emsp;-&emsp; Takes input of uniqueId and newTargetUrl and invokes the update action of the webhook microservice to update the perticular data from the database

```/admin/delete``` &emsp;&emsp;-&emsp; Takes input of uniqueId and invokes the delete action of the webhook microservice to delete the perticular data from the database

```/admin/ip``` &emsp;&emsp;&emsp;&emsp;-&emsp; Takes Ip address of the user invokes the trigger action of the webhook microservice which maps it with the microservice time stamp to send out post requests
## Testing:
#### The api is made only accessible to the admin hence the "userRole" should be equal to admin.

* A sample request sent from [postman](https://www.postman.com/) or any other doccument testing client looks as follows :
* ![image](https://user-images.githubusercontent.com/45617530/126041882-808892e5-3648-4177-8786-3bac403a7bf3.png)

## Installation

1. Clone the repo
```sh
git clone https://github.com/KUHOO-S/Webhook-Microservices.git
cd Webhook-Microservices
```
2. Install all requirements
```sh
npm install
```
3. Create a .env file and add all details according to the [dummy.env file](https://github.com/KUHOO-S/Webhook-Microservices/blob/main/dummy.env)
4. Setup and Run the node app with starting point **index.js**
```sh
node index.js
```
or build the Docker Image
```sh
sudo docker build -t websocket-microservice .
```
```sh
sudo docker run -d websocket-microservice 
```
## References
1. [Moleculer](https://moleculer.services/)
2. [ExpressJs](https://expressjs.com/)
3. [NodeJs](https://nodejs.org/en/)
4. [Postman](https://www.postman.com/)
