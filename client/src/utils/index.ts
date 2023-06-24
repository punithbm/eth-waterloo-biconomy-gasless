import { toast } from 'react-toastify';
import { ACTIONS } from '../context/GlobalContext';
import { getStore } from '../store/GlobalStore';

export const toastFlashMessage = (message: string | React.ReactElement, type: string, delay = 3000) => {
  const { dispatch } = getStore();
  dispatch({
    type: ACTIONS.CLEAR_TOAST,
    payload: {
      message: '',
      toastType: '',
    },
  });
  setTimeout(function () {
    dispatch({
      type: ACTIONS.SHOW_TOAST,
      payload: {
        message: message,
        toastType: type,
      },
    });
    setTimeout(function () {
      dispatch({
        type: ACTIONS.HIDE_TOAST,
        payload: {},
      });
    }, delay);
  }, 200);
};

export const getImage = (image: string) => {
  if (!image) {
    return;
  }
  return new URL(`../assets/images/${image}`, import.meta.url).href;
};

export const handleCopy = (addressId: string) => {
  toast.success('Address copied to clipboard');
  navigator.clipboard.writeText(addressId);
};

export const shortenAddress = (str?: string, isLengther?: boolean, maxCharsCount = 15) => {
  if (!str) {
    return '';
  }
  if (str && isLengther) {
    return str.substring(0, maxCharsCount) + '...' + str.substring(str.length - maxCharsCount, str.length);
  } else if (str.length > 20) {
    return str.substring(0, 5) + '...' + str.substring(str.length - 4, str.length);
  }
  return str;
};

export const hexToNumber = (val: string, divider = 1) => {
  return parseInt(val, 16) / divider;
};
