## API tests using [petstore](https://petstore.swagger.io/#/)

#### Clone this repo  
Install node lts 18.17.0, I use [nvm windows](https://github.com/coreybutler/nvm-windows/releases) for this   
`nvm install lts`  
`nvm use 18.17.0`  
`git clone https://github.com/drewblerainbow/petshop-api-tests.git`   
in the project directory, run these on cmd:  
`npm install -g yarn`  
`yarn add supertest jest ts-jest @types/jest @types/supertest -D`  
you should be able to run the tests now  

##### How to run tests:  
Run all jest tests with `yarn test`  
Run a particular test suite with `yarn test ${file name}`  
Run a load test with `artillery run ${file name}`  
##### [Test plan on google docs](https://docs.google.com/spreadsheets/d/1M_sXd3EaRquolIaVKNciKrh7frPKTksfdzRr7jNa0Q0/edit#gid=0)  

##### What this project is built on  
[standard react/express/jest framework](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript) as the base    
[supertest](https://www.npmjs.com/package/supertest) to run api tests  
[artillery](https://www.npmjs.com/package/artillery) to run load tests   