import { useEffect } from "react";

import { useAppDispatch } from "./redux-hooks";

const InitReduxData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initData = async () => {
      await Promise.all([dispatch(loadUser()), dispatch(loadTokens())]);
    };
    initData();
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default InitReduxData;
