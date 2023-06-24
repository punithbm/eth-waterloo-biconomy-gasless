import { FC } from 'react';

import { getImage } from '../utils';

export type TCopyAddressTypes = {
  className?: string;
  address?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const CopyAddress: FC<TCopyAddressTypes> = (props) => {
  const { onClick, address } = props;

  return (
    <p role={'presentation'} className={` copy-icon-wrapper flex gap-2  hover:text-neutral-50 dark:hover:text-neutral-50 cursor-pointer`} onClick={onClick}>
      <span>{address}</span>
      <img src={getImage('copy_grey.svg')} alt="copy" className="default-icon" />
      <img src={getImage('copy_light_grey.svg')} alt="copy" className="active-icon" />
    </p>
  );
};

export default CopyAddress;
