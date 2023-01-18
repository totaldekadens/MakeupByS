import { Types } from "mongoose";
import { Dispatch, SetStateAction } from "react";

const useDeleteProduct = async (
  id: Types.ObjectId,
  setIsUpdated: Dispatch<SetStateAction<boolean>>
) => {
  const response = await fetch(`/api/admin/subproduct/${id}`, {
    method: "DELETE",
  });
  let result = await response.json();
  console.log(result);
  if (result.success) {
    setIsUpdated(true);
    return true;
  }
  return false;
};

export default useDeleteProduct;
