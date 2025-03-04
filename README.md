# Product Name
> MealPath is an order management system for italian style pizza and not only

[![.NET 6](https://img.shields.io/badge/.NET-6-512BD4.svg)](https://dotnet.microsoft.com/)
[![TypeScript 3.9.10](https://img.shields.io/badge/TypeScript-3.9.10-007ACC.svg)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![Node.js 20.11.x](https://img.shields.io/badge/Node.js-20.11.x-339933.svg)](https://nodejs.org/)
[![npm 10.2.x](https://img.shields.io/badge/npm-10.2.x-CB3837.svg)](https://www.npmjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248.svg)](https://www.mongodb.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-Latest-CC2927.svg)](https://www.microsoft.com/en-us/sql-server)


MealPath is a faculty course project, it is built as an online pizza ordering web app, with different roles for content management.
MealPath is build using Asp.Net core framework for backend(API project) and a React App for front end which consumes the API.
Main features of this web app: User registration and management with .NET identity, 3 different roles(User, Admin, SuperAdmin), Content management,
Integration of Stripe for payments.


![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/f7809015-da9e-4284-9839-2bfac7709077)
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/030c8f67-9df9-45ec-a666-2a65dcf68027)
## Logged in as simple user
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/e8b48417-039b-4835-8ddd-4f87256acf80)
## Products to Cart
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/98257be2-ad30-49c9-8c86-c6fd7f748769)
## Stripe payment page
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/b2965cb1-a4f2-44cf-871c-ffb80cb642f5)
## Cancel payment
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/e6873115-bc1b-414b-847a-f2172af7a36b)
## Logged in as Admin
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/4fb9ceb8-d77c-4bc5-92c9-94a1d954788b)
## Product management
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/1f6c14a5-d2bc-4cc9-a548-67fba5987257)
## Logged in as SuperAdmin
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/482786ad-cadc-42d4-bd25-96cdf284c16c)
## Users management
![image](https://github.com/ArberZe/MealPath.OrderManagement/assets/67877624/fe9391e3-4da5-48bc-b11e-dcaa6e0f3422)


## Usage example

After you clone the project,
You don't have to change the connection string because it uses the defaul sql server instance name, 
and you don't have to run **dotnet ef update database** because it is using entity framework feature: localdb 

steps to run .NET API (.NET 6):
- Open .sln file with visual studio(2022, 2019 or 2017)
- run without debugging

steps to run react project:
- Open mealpath.app(React) folder possibly with vscode
- open terminal inside vscode and run the command:
 ```sh
  npm install
  ```
- then run the command :
 ```sh
  npm start
  ```
- React Project should run seamlessly


## Development setup

To be able to run this project you should have these technologies installed on you machine:
- SQL server express: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- MongoDb with MongoDbCompass: https://www.mongodb.com/try/download/community
- .NET 6: https://dotnet.microsoft.com/en-us/download/dotnet/6.0
- Node Js >18.x.x: https://nodejs.org/en/download
- npm: preferably: 10.2.4: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
## Meta

Arber Zeka – [@ArberZeka](https://www.linkedin.com/in/arber-zeka-742452220/) 
Erion Ismajli [@ErionIsmajli](https://www.linkedin.com/in/erion-ismajli/)
