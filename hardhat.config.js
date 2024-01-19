require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli:{
      url: "https://goerli.infura.io/v3/ca6588b9bf9c4eadb7b34f914e6b14c4",
      accounts: [`3302f0652f475c3fd856460247c8cb0071e6b1260775d71e3505942c3c0f5fd8`]
    },
    // rinkeby: {
    //   url: "Infura key",
    //   accounts: [`replace private key`]
    // }
  }
};
