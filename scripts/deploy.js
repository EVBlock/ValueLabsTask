
const hre = require("hardhat");

async function main() {
  
  const ToDo = await hre.ethers.getContractFactory("ToDo");
  const todo = await ToDo.deploy();

  await todo.deployed();

  console.log("todo deployed to:", todo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
