import { FC } from 'react';
import { getImage } from '../utils';

export interface ILoginProps {
  login?: () => void;
  loading?: boolean;
}
const Login: FC<ILoginProps> = (props) => {
  const { login, loading } = props;

  return (
    <div className="relative h-screen w-full">
      <div>
        <img className="" src={getImage('bg.png')}></img>
      </div>
      <p className="mt-5 text-[28px] font-bold leading-12"> Counter dApp</p>
      <p className="mt-1 text-[28px] font-bold leading-12"> Account Abstraction</p>
      <p className="mt-2"> Gasless Transaction & Social Login</p>
      <div className="absolute w-full bottom-12 left-1/2 -translate-x-1/2">
        <button type={'button'} className={'btn-primary bg-[#4F48BF] w-full text-base '} onClick={login}>
          <span className="relative">{loading ? 'LOGIN...' : 'LOGIN'}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
