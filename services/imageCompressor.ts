import imageCompression from "browser-image-compression";

export const compress = async (imageFile: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(
      `Reduced image size from ${imageFile.size / 1024 / 1024} MB to ${
        compressedFile.size / 1024 / 1024
      } MB`
    );
    return compressedFile;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to compress file");
  }
};
