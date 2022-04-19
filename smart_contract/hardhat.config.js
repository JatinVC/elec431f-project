// https://eth-ropsten.alchemyapi.io/v2/4WqPa_tZMfVXUX7ZQvMACivaajy0X9Dc
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/4WqPa_tZMfVXUX7ZQvMACivaajy0X9Dc',
      accounts: ['cc6783beb01ea8703882319bd591a93962cc6120c3e30744d87aa175983472ff'],
    },
  },
};