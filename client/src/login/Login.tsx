import { FC } from 'react';
import { getImage } from '../utils';

export interface ILoginProps {
  login?: () => void;
}
const Login: FC<ILoginProps> = (props) => {
  const { login } = props;

  return (
    <div className="">
      <img className="w-5 h-5" src={getImage('logo.svg')}></img>
    </div>
  );
};

export default Login;
