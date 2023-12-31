import { BigNumber, ethers } from 'ethers';
import { get } from 'http';
import { useEffect, useState } from 'react';

import { Messenger as MessengerType } from '../typechain-types';

import { getEthereum } from '@/utils/ethereum';
import abi from '@/utils/Messenger.json';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contractABI = abi.abi;

export type Message = {
  sender: string;
  receiver: string;
  depositInWei: BigNumber;
  timestamp: Date;
  text: string;
  isPending: boolean;
};

type PropsSendMessage = {
  text: string;
  receiver: string;
  tokenInEther: string;
};

type ReturnUseMessengerContract = {
  processing: boolean;
  ownMessages: Message[];
  owner: string;
  numOfPendingLimits: BigNumber | undefined;
  sendMessage: (props: PropsSendMessage) => void;
  acceptMessage: (index: BigNumber) => void;
  denyMessage: (index: BigNumber) => void;
  changeNumOfPendingLimits: (limits: BigNumber) => void;
};

type PropsUseMessengerContract = {
  currentAccount: string | undefined;
};

export const useMessengerContract = ({
  currentAccount,
}: PropsUseMessengerContract): ReturnUseMessengerContract => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [messengerContract, setMessengerContract] = useState<MessengerType>();
  const [ownMessages, setOwnMessages] = useState<Message[]>([]);
  const [owner, setOwner] = useState<string>('');
  const [numOfPendingLimits, setNumOfPendingLimits] = useState<BigNumber>();

  const ethereum = getEthereum();

  function getMessengerContract() {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(
          ethereum as unknown as ethers.providers.ExternalProvider,
        );
        const signer = provider.getSigner();
        const MessengerContract = new ethers.Contract(
          contractAddress!,
          contractABI,
          signer,
        ) as MessengerType;
        setMessengerContract(MessengerContract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getOwnMessages() {
    if (!messengerContract) return;

    try {
      const OwnMessages = await messengerContract.getOwnMessages();
      const messageCleaned: Message[] = OwnMessages.map((message) => {
        return {
          sender: message.sender,
          receiver: message.receiver,
          depositInWei: message.depositInWei,
          timestamp: new Date(message.timestamp.toNumber() * 1000),
          text: message.text,
          isPending: message.isPending,
        };
      });
      setOwnMessages(messageCleaned);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage({
    text,
    receiver,
    tokenInEther,
  }: PropsSendMessage) {
    if (!messengerContract) return;

    try {
      const tokenInWei = ethers.utils.parseEther(tokenInEther);
      console.log(
        'call post with receiver:[%s], token:[%s]',
        receiver,
        tokenInWei.toString(),
      );

      const txn = await messengerContract.post(text, receiver, {
        gasLimit: 300000,
        value: tokenInWei,
      });
      console.log('Processing...', txn.hash);
      setProcessing(true);

      await txn.wait();
      console.log('Done --', txn.hash);
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function acceptMessage(index: BigNumber) {
    if (!messengerContract) return;

    try {
      console.log('call accept with index:[%d]', index.toNumber());

      const txn = await messengerContract.accept(index, { gasLimit: 300000 });
      console.log('Processing...', txn.hash);
      setProcessing(true);

      await txn.wait();
      console.log('Done --', txn.hash);
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function denyMessage(index: BigNumber) {
    if (!messengerContract) return;

    try {
      console.log('call deny with index:[%d]', index.toNumber());

      const txn = await messengerContract.deny(index, { gasLimit: 300000 });
      console.log('Processing...', txn.hash);
      setProcessing(true);

      await txn.wait();
      console.log('Done --', txn.hash);
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOwner() {
    if (!messengerContract) return;

    try {
      console.log('call getter of owner');
      const owner = await messengerContract.owner();
      setOwner(owner.toLocaleLowerCase());
    } catch (error) {
      console.log(error);
    }
  }

  async function getNumOfPendingLimits() {
    if (!messengerContract) return;

    try {
      console.log('call getter of numOfPendingLimits');
      const limits = await messengerContract.numOfPendingLimits();
      setNumOfPendingLimits(limits);
    } catch (error) {
      console.log(error);
    }
  }

  async function changeNumOfPendingLimits(limits: BigNumber) {
    if (!messengerContract) return;

    try {
      console.log(
        'call changeNumOfPendingLimits with limits:[%d]',
        limits.toNumber(),
      );
      const txn = await messengerContract.changeNumOfPendingLimits(limits, {
        gasLimit: 300000,
      });
      console.log('Processing...', txn.hash);
      setProcessing(true);

      await txn.wait();
      console.log('Done --', txn.hash);
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessengerContract();
    getOwnMessages();
    getOwner();
    getNumOfPendingLimits();
  }, [currentAccount, ethereum]);

  useEffect(() => {
    // Event listener
    const onNewMessage = (
      sender: string,
      receiver: string,
      depositInWei: BigNumber,
      timestamp: BigNumber,
      text: string,
      isPending: boolean,
    ) => {
      console.log('NewMessage from %s to %s', sender, receiver);

      if (receiver.toLocaleLowerCase() === currentAccount) {
        setOwnMessages((prevState) => [
          ...prevState,
          {
            sender,
            receiver,
            depositInWei,
            timestamp: new Date(timestamp.toNumber() * 1000),
            text,
            isPending,
          },
        ]);
      }
    };

    const onMessageConfirmed = (receiver: string, index: BigNumber) => {
      console.log(
        'MessageConfirmed index:[%d] receiver: [%s]',
        index.toNumber(),
        receiver,
      );

      if (receiver.toLocaleLowerCase() === currentAccount) {
        setOwnMessages((prevState) => {
          prevState[index.toNumber()].isPending = false;
          return [...prevState];
        });
      }
    };

    const onNumOfPendingLimitsChanged = (limitsChanged: BigNumber) => {
      console.log(
        'NumOfPendingLimitsChanged limits:[%d]',
        limitsChanged.toNumber(),
      );
      setNumOfPendingLimits(limitsChanged);
    };

    if (messengerContract) {
      messengerContract.on('NewMessage', onNewMessage);
      messengerContract.on('MessageConfirmed', onMessageConfirmed);
      messengerContract.on(
        'NumOfPendingLimitsChanged',
        onNumOfPendingLimitsChanged,
      );
    }

    return () => {
      if (messengerContract) {
        messengerContract.off('NewMessage', onNewMessage);
        messengerContract.off('MessageConfirmed', onMessageConfirmed);
        messengerContract.off(
          'NumOfPendingLimitsChanged',
          onNumOfPendingLimitsChanged,
        );
      }
    };
  }, [messengerContract, currentAccount]);

  return {
    processing,
    ownMessages,
    owner,
    numOfPendingLimits,
    sendMessage,
    acceptMessage,
    denyMessage,
    changeNumOfPendingLimits,
  };
};
