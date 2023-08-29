// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Messenger {
    uint256 public numOfPendingLimits;

    struct Message {
        address payable sender;
        address payable receiver;
        uint256 depositInWei;
        uint256 timestamp;
        string text;
        bool isPending;
    }

    mapping(address => Message[]) private _messagesAtAddress;
    mapping(address => uint256) private _numOfPendingAtAddress;

    event NewMessage(
        address sender,
        address receiver,
        uint256 depositInWei,
        uint256 timestamp,
        string text,
        bool isPending
    );
    event MessageConfirmed(address receiver, uint256 index);

    constructor(uint256 _numOfPendingLimits) payable {
        console.log("Here is my first smart contract!");

        numOfPendingLimits = _numOfPendingLimits;
    }

    function post(
        string memory _text,
        address payable _receiver
    ) public payable {
        require(
            _numOfPendingAtAddress[msg.sender] < numOfPendingLimits,
            "The receiver has reached the number of pending limits"
        );
        _numOfPendingAtAddress[msg.sender] += 1;

        console.log(
            "%s posts text:[%s] token:[%s]",
            msg.sender,
            _text,
            msg.value
        );

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

        emit NewMessage(
            msg.sender,
            _receiver,
            msg.value,
            block.timestamp,
            _text,
            true
        );
    }

    function accept(uint256 _index) public {
        _confirmMessage(_index);
        Message memory message = _messagesAtAddress[msg.sender][_index];
        _sendAvax(message.receiver, message.depositInWei);
        emit MessageConfirmed(message.receiver, _index);
    }

    function deny(uint256 _index) public payable {
        _confirmMessage(_index);
        Message memory message = _messagesAtAddress[msg.sender][_index];
        _sendAvax(message.sender, message.depositInWei);
        emit MessageConfirmed(message.receiver, _index);
    }

    function _confirmMessage(uint256 _index) private {
        Message storage message = _messagesAtAddress[msg.sender][_index];

        require(
            msg.sender == message.receiver,
            "Only the receiver can _confirmMessage the message"
        );
        require(
            message.isPending == true,
            "This message has already been confirmed"
        );

        message.isPending = false;
    }

    function _sendAvax(address payable _to, uint256 _amountInWei) private {
        (bool success, ) = (_to).call{value: _amountInWei}("");
        require(success, "Failed to withdraw AVAX from contract");
    }

    function getOwnMessages() public view returns (Message[] memory) {
        return _messagesAtAddress[msg.sender];
    }
}
