import { app } from "@/app/client/lib/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage(app);

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

type ResponseUpload = {
  upload: false,
  message: string,
} | {
  upload: true,
  message: string,
  url: string
}

/**
 * Function for upload any file to cloud storage
 * @param file - File
 */

const uploadFileToStorage = async (foldername: string, file: File) => {
  const filename = `${Date.now() / 1000}_${file.name}`;
  const storageRef = ref(storage, foldername + filename);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  return new Promise<ResponseUpload>((resolve, reject) => {
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          reject({
            upload: false,
            message: "User doesn't have permission to access the object"
          })
          
        case 'storage/canceled':
          reject({
            upload: false,
            message: "User canceled the upload"
          })
        case 'storage/unknown':
          reject({
            upload: false,
            message: "Unknown error occurred"
          })
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve({
          upload: true,
          message: 'File uploaded successfully',
          url: downloadURL
        })
      });
    }
  );
  })
}

export default uploadFileToStorage