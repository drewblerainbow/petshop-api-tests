## API tests using [petstore](https://petstore.swagger.io/#/)

#### Clone this repo  
Install node lts 18.17.0, I use [nvm windows](https://github.com/coreybutler/nvm-windows/releases) for this   
`nvm install lts`  
`nvm use 18.17.0`  
`git clone https://github.com/drewblerainbow/petshop-api-tests.git`   
in the project directory, run these on cmd:  
`npm install -g yarn`  
`yarn add supertest jest ts-jest @types/jest @types/supertest -D`  
you should be able to run the jest tests now  
`npm install -g artillery`  
you should be able to run the load test now  

##### How to run tests:  
Run all jest tests with `yarn test`  
Run a particular test suite with `yarn test ${file name}`  
![jest run](https://github.com/drewblerainbow/petshop-api-tests/tree/main/images/Capture_jest.png)  
Run a load test with `artillery run ${path_to_file_name}`  
![load test run](https://github.com/drewblerainbow/petshop-api-tests/tree/main/images/Capture_load.png)
##### [Test plan on google docs](https://docs.google.com/spreadsheets/d/1M_sXd3EaRquolIaVKNciKrh7frPKTksfdzRr7jNa0Q0/edit#gid=0)  

##### API Tests
[/pet](https://github.com/drewblerainbow/petshop-api-tests/tree/main/src/__test__/pet)  
[/store](https://github.com/drewblerainbow/petshop-api-tests/tree/main/src/__test__/store)  
[/user](https://github.com/drewblerainbow/petshop-api-tests/tree/main/src/__test__/user)  
##### Load Test(s)
[/store](https://github.com/drewblerainbow/petshop-api-tests/tree/main/src/__test__/load)

##### What this project is built on  
[standard react/express/jest framework](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript) as the base    
[supertest](https://www.npmjs.com/package/supertest) to run api tests  
[artillery](https://www.npmjs.com/package/artillery) to run load tests   