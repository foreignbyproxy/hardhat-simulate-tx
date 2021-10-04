# hardhat-simulate-tx

### Work In Progress

A [Hardhat](https://hardhat.org) plugin to programmatically send transactions on your local development network. The plugin can simulate the following:

-   ETH transactions between random signers
-   ETH transactions between a `target` address and randoms signers.

**Future types of transactions**
- Transactions with ERC20 tokens
- Programitic calls to contracts methods

## Installation

Run the following command to install hardhat-simulate-tx in your hardhat project. The pluging requires the [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers) plugin and the Ethereum library `ethers.js`.

```bash
npm install hardhat-simulate-tx @nomiclabs/hardhat-ethers ethers@^5.0.0
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-simulate-tx");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-simulate-tx";
```

## Required plugins

-   [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)

## Configuration

The plugin adds the `simulateTx` property to `hardhat.config.js`. Use this property to configure the transactions.

By default, the task will send 5 random ETH transactions between random signers.

Assigning a `target` will direct all of the transactions to the target address.

This is an example:

```js
module.exports = {
    simulateTx: {
        target: <ethereum-address>,
		delay: 5000
    }
};
```

## Tasks

The plugin adds the `simulate` task to Hardhat.

```
npx hardhat simulate
```
