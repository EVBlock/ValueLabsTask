# This Is Test ToDo APP Task using Solidity, Hardhat and React

This app is intented to show the capability of smart contract, backend and frontend technical skills.

##### Development tools used are 
- HardHat for contract deployment
- Solidity 
- React and NodeJs 
- Metamask Wallet
- VSCode IDE

#### Installation

This app recommends [Node.js](https://nodejs.org/) v16+ to run.
Add chrome metamask extensions
Go to root in directory. Run npm following commands for dependencies installation and run: 

```sh
npm i
npm start
```
Open new terminal and run following commands:
```sh
npx hardhat compile (This will compile Solidity contracts)
npx hardhat node (This will run Node locally)
```
Open new terminal and run following command to deploy contract:
```sh
 npx hardhat run scripts/deploy.js --network goerli 
 Once contract gets deployed we need to replace the contract address in context folder / SmartContract / index.js file
```

