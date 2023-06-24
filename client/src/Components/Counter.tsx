import React, { useState, useEffect } from 'react';
import SmartAccount from '@biconomy/smart-account';
import abi from '../utils/counterAbi.json';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shortenAddress } from '../utils';

interface Props {
  smartAccount: SmartAccount;
  provider: any;
}

const Counter: React.FC<Props> = ({ smartAccount, provider }) => {
  const [count, setCount] = useState<number>(0);
  const [counterContract, setCounterContract] = useState<any>(null);
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const counterAddress = import.meta.env.VITE_COUNTER_CONTRACT_ADDRESS;
  console.log('counterAddress', counterAddress);
  useEffect(() => {
    // setIsLoading(true)
    getCount(false);
  }, []);

  const getCount = async (isUpdating: boolean) => {
    const contract = new ethers.Contract(counterAddress, abi, provider);
    setCounterContract(contract);
    const currentCount = await contract.count();
    setCount(currentCount.toNumber());
    if (isUpdating) {
      toast.success('count has been updated!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const incrementCount = async () => {
    try {
      toast.info('processing count on the blockchain!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setLoading(true);
      const incrementTx = await counterContract.populateTransaction.incrementCount();
      const tx1 = {
        to: counterAddress,
        data: incrementTx.data,
      };
      const txResponse = await smartAccount.sendTransaction({ transaction: tx1 });

      const txHash = await txResponse.wait();
      console.log('tx', txHash);
      setHash(txHash.transactionHash);
      setLoading(false);
      getCount(true);
    } catch (error) {
      console.log({ error });
      toast.error('error occured check the console', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <p className="text-left pl-5 pt-5 font-bold">Count:</p>
      <p className="text-left pl-5 font-bold">{count}</p>
      <button className="flex justify-start bg-[#4F48BF] ml-5 btn-primary mt-3" onClick={() => incrementCount()}>
        {loading ? 'Processing...' : 'Increment Count'}
      </button>
      {hash && <a className="flex justify-start ml-5 underline text-left mt-3" href={`https://mumbai.polygonscan.com/tx/${hash}`} target="_blank">{`Last tx hash: ${shortenAddress(hash)}->`}</a>}
    </>
  );
};

export default Counter;
