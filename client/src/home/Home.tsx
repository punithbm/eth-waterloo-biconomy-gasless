import { FC, useState } from 'react';
import { getImage, handleCopy, hexToNumber, shortenAddress } from '../utils';
import CopyAddress from './CopyAddress';
import { globalApiService } from '../utils/globalApiServices';
import BigNumber from 'bignumber.js';
import Counter from '../Components/Counter';
import SmartAccount from '@biconomy/smart-account';

export interface IHomeProps {
  logout?: () => void;
  address?: string;
  smartAccount: SmartAccount;
  provider: any;
}
const Home: FC<IHomeProps> = (props) => {
  const { address, logout, smartAccount, provider } = props;
  const [bal, setBal] = useState(0);

  const getBalance = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      globalApiService({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getBalance().then((res) => {
    console.log(res, 'response');
    const balHex = hexToNumber(res?.data?.result ?? '0x');
    console.log(balHex);
    const balance = balHex / Math.pow(10, 18);

    console.log(balance, 'bg');
    setBal(Number(balance.toFixed(6)));
  });

  return (
    <div className="relative h-screen w-full">
      <div className="bg-[#000000] p-5 m-4 rounded-lg text-white h-[200px]">
        <div className="flex justify-between ">
          <p className="">Account</p>
          <p className="">Polygon Mumbai Testnet</p>
        </div>

        <CopyAddress
          address={shortenAddress(address)}
          onClick={() => {
            handleCopy(address as string);
          }}
        />
        <p className="text-left text-[24px] mt-[90px]"> {`${bal} MATIC`}</p>
      </div>
      <h3 className="text-left pl-5 font-bold">Smart Account Address:</h3>
      <p className="text-[12px] text-left pl-5">{smartAccount.address}</p>
      <Counter smartAccount={smartAccount} provider={provider} />

      <div className="absolute w-full bottom-10 left-1/2 -translate-x-1/2">
        <button type={'button'} className={'btn-primary bg-[#4F48BF] w-full text-base '} onClick={logout}>
          <span className="relative">{'Logout'}</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
