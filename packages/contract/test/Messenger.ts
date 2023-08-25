import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import type { Overrides } from "ethers";
import hre, { ethers } from "hardhat";

describe("Messenger", function () {
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();

    const funds = 100;

    const Messenger = await hre.ethers.getContractFactory("Messenger");
    const messenger = await Messenger.deploy({
      value: funds,
    } as Overrides);

    return { messenger, funds, owner, otherAccount };
  }

  describe("Post", function () {
    it("Should send the correct amount of tokens", async function () {
      const { messenger, owner, otherAccount } = await loadFixture(
        deployContract
      );
      const testDeposit = 10;

      await expect(
        messenger.post("text", otherAccount.address, {
          value: testDeposit,
        })
      ).to.changeEtherBalances([owner, messenger], [-testDeposit, testDeposit]);
    });

    it("Should set the right Message", async function () {
      const { messenger, owner, otherAccount } = await loadFixture(
        deployContract
      );
      const testDeposit = 10;
      const testText = "text";

      await messenger.post(testText, otherAccount.address, {
        value: testDeposit,
      });
      const messages = await messenger.connect(otherAccount).getOwnMessages();
      const message = messages[0];
      expect(message.depositInWei).to.equal(testDeposit);
      expect(message.text).to.equal(testText);
      expect(message.isPending).to.equal(true);
      expect(message.sender).to.equal(owner.address);
      expect(message.receiver).to.equal(otherAccount.address);
    });
  });

  describe("Accept", function () {
    it("isPending must be changed", async function () {
      const { messenger, otherAccount } = await loadFixture(deployContract);
      const firstIndex = 0;

      await messenger.post("text", otherAccount.address);
      const messages = await messenger.connect(otherAccount).getOwnMessages();
      expect(messages[firstIndex].isPending).to.equal(true);

      await messenger.connect(otherAccount).accept(firstIndex);
      const messages2 = await messenger.connect(otherAccount).getOwnMessages();
      expect(messages2[firstIndex].isPending).to.equal(false);
    });

    it("Should send the correct amount of tokens", async function () {
      const { messenger, owner, otherAccount } = await loadFixture(
        deployContract
      );
      const testDeposit = 10;

      await messenger.post("text", otherAccount.address, {
        value: testDeposit,
      });

      const firstIndex = 0;
      await expect(
        messenger.connect(otherAccount).accept(firstIndex)
      ).to.changeEtherBalances(
        [messenger, otherAccount],
        [-testDeposit, testDeposit]
      );
    });

    it("Should revert with the right error if called in duplicate", async function () {
      const { messenger, otherAccount } = await loadFixture(deployContract);

      await messenger.post("text", otherAccount.address, { value: 1 });
      await messenger.connect(otherAccount).accept(0);
      await expect(
        messenger.connect(otherAccount).accept(0)
      ).to.be.revertedWith("This message has already been confirmed");
    });
  });

  describe("Deny", function () {
    it("isPending must be changed", async function () {
      const { messenger, otherAccount } = await loadFixture(deployContract);
      const firstIndex = 0;

      await messenger.post("text", otherAccount.address);
      const messages = await messenger.connect(otherAccount).getOwnMessages();
      expect(messages[firstIndex].isPending).to.equal(true);

      await messenger.connect(otherAccount).deny(firstIndex);
      const messages2 = await messenger.connect(otherAccount).getOwnMessages();
      expect(messages2[firstIndex].isPending).to.equal(false);
    });

    it("Should send the correct amount of tokens", async function () {
      const { messenger, owner, otherAccount } = await loadFixture(
        deployContract
      );
      const testDeposit = 10;

      await messenger.post("text", otherAccount.address, {
        value: testDeposit,
      });

      const firstIndex = 0;
      await expect(
        messenger.connect(otherAccount).deny(firstIndex)
      ).to.changeEtherBalances([messenger, owner], [-testDeposit, testDeposit]);
    });

    it("Should revert with the right error if called in duplicate", async function () {
      const { messenger, otherAccount } = await loadFixture(deployContract);

      await messenger.post("text", otherAccount.address, { value: 1 });
      await messenger.connect(otherAccount).deny(0);
      await expect(messenger.connect(otherAccount).deny(0)).to.be.revertedWith(
        "This message has already been confirmed"
      );
    });
  });
});
