const parseBlobToData = (inputFile): Promise<string | ArrayBuffer> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(inputFile);
  });
};

export default parseBlobToData;
