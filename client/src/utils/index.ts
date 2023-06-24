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
