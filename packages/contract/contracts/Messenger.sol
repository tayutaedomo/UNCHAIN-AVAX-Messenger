// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Messenger {
    struct Message {
        address payable sender;
        address payable receiver;
        uint256 depositInWei;
        uint256 timestamp;
        string text;
        bool isPending;
    }

    mapping (address => Message[]) private _messagesAtAddress;
    constructor() payable {
        console.log("Here is my first smart contract!");
    }

    function post(string memory _text, address payable _receiver) public payable {
        console.log("%s posts text:[%s] token:[%]", msg.sender, _text, msg.value);

        _messagesAtAddress[_receiver].push(
            Message(
                payable(msg.sender),
                _receiver,
                msg.value,
                block.timestamp,
                _text,
                true
            )
        );
    }

    function getOwnMessages() public view returns (Message[] memory) {
        return _messagesAtAddress[msg.sender];
    }
}
