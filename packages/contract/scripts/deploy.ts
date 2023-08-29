import { Overrides } from 'ethers';
import { ethers } from 'hardhat';

async function deploy() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const numOfPendingLimits = 10;
  const funds = 100;

  const Messenger = await ethers.getContractFactory('Messenger');
  const messenger = await Messenger.deploy(numOfPendingLimits, {
    value: funds,
  } as Overrides);
  await messenger.deployed();

  console.log('Contract deployed at:', messenger.address);
  console.log("Contract's owner is:", await messenger.owner());
  console.log(
    "Contract's number of pending limits is:",
    await messenger.numOfPendingLimits(),
  );
  console.log(
    "Contract's fund is:",
    await messenger.provider.getBalance(messenger.address),
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
