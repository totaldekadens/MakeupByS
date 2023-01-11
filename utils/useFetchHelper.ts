import { Dispatch, SetStateAction } from "react";

const useFetchHelper = async (
  setStatus: Dispatch<SetStateAction<number>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setItem: Dispatch<any>,
  url: string
) => {
  try {
    setStatus(200);
    setIsLoading(true);
    let response = await fetch(url);
    let result = await response.json();
    setStatus(response.status);
    if (result.success) {
      setItem(result.data);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  } catch (err) {
    console.error(err);
  }
};

export default useFetchHelper;
