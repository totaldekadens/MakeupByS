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
  // #136
  if (result.success) {
    alert("Produkt raderad");
    setIsUpdated(true);
    return;
  }
  alert("Produkt kunde inte raderas");
};

export default useDeleteProduct;
