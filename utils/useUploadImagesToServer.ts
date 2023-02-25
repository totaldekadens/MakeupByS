const UploadToImagesToServer = async (fileList: File[]) => {
  const body = new FormData();

  for (let i = 0; i < fileList.length; i++) {
    let img = fileList[i];
    body.append("file", img);
    body.append("upload_preset", "my-uploads");
    body.append("folder", "makeupbys");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dkzh2lxon/image/upload",
      {
        method: "POST",
        body,
      }
    );

    const result = response.json();
    console.log(result);
  }
};

export default UploadToImagesToServer;
