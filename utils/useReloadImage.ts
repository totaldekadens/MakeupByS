// Reloads added images after build
const useReloadImage = async (image: string) => {
  try {
    const src1 = require(`/public/uploads/${image}`);
    console.log(src1);
    if (src1) {
      console.log("Den finns");
      return false;
    }
    const updateImage = await updateImages(image);
    return updateImage;
  } catch (err) {
    const updateImage = await updateImages(image);
    return updateImage;
  }
};

const updateImages = async (image: string) => {
  console.log("Och här?");
  let response = await fetch(`/api/images/${image}`);
  const blob = await response.blob();
  const imageBase64 = URL.createObjectURL(blob);
  imageBase64.replace("blob:", "");
  return imageBase64;
};

export default useReloadImage;
