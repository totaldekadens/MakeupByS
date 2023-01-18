const UploadToImagesToServer = async (fileList: File[]) => {
  const body = new FormData();

  for (let i = 0; i < fileList.length; i++) {
    let img = fileList[i];
    body.append("file", img);
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body,
    });
  }
};

export default UploadToImagesToServer;
