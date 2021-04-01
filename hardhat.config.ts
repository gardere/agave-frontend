import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

import { HardhatUserConfig } from 'hardhat/types';
import { task } from 'hardhat/config';
import 'hardhat-typechain';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-deploy';

const INFURA_ENDPOINT_RINKEBY: string | undefined = process.env.INFURA_ENDPOINT_RINKEBY;
const INFURA_SECRET_RINKEBY: string | undefined = process.env.INFURA_SECRET_RINKEBY;
const INFURA_SECRET_RINKEBY_BASIC_AUTH: string | undefined =
  process.env.INFURA_SECRET_RINKEBY_BASIC_AUTH;
const ACCOUNT_KEY_RINKEBY: string | undefined = process.env.ACCOUNT_KEY_RINKEBY;
const ETHERSCAN_API_KEY: string | undefined = process.env.ETHERSCAN_API_KEY;

function isDefined<T>(t: T | null | undefined): t is T {
  return t != null;
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: '0.6.12', settings: {} },{ version: "0.8.2", settings: {} }],
    overrides: {
      "contracts/UniswapBuildHook.sol": {
        version: "0.6.6",
        settings: {}
      }
    }
  },
  networks: {
    hardhat: {},
    // localhost: {},
    // rinkeby:
    //   INFURA_ENDPOINT_RINKEBY && INFURA_SECRET_RINKEBY_BASIC_AUTH && ACCOUNT_KEY_RINKEBY
    //     ? {
    //         url: INFURA_ENDPOINT_RINKEBY,
    //         accounts: [ACCOUNT_KEY_RINKEBY],
    //         httpHeaders: { Authorization: `Basic ${INFURA_SECRET_RINKEBY_BASIC_AUTH}` },
    //       }
    //     : undefined,
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  etherscan: ETHERSCAN_API_KEY
    ? {
        apiKey: ETHERSCAN_API_KEY,
      }
    : undefined,
};

export default config;
