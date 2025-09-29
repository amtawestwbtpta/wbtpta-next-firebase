"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";
import { firestore, storage } from "../../context/FirebaseContext";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  decryptObjData,
  encryptObjData,
  getCookie,
} from "../../modules/encryption";
import { useGlobalContext } from "../../context/Store";
import axios from "axios";
import ImageCropper from "../../components/ImageCropper";

const ChangePhoto = () => {
  const { state, setUSER } = useGlobalContext();
  const router = useRouter();

  let id, teachersID, url, photoName;
  let details = getCookie("uid");
  if (details) {
    let userdetails = decryptObjData("uid");
    id = userdetails.id;
    teachersID = userdetails.teachersID;
    url = userdetails.url;
    photoName = userdetails.photoName;
  }

  const folder = "profileImage";
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState(null);

  const [photoCropped, setPhotoCropped] = useState(true);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedPreview, setCroppedPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [errField, setErrField] = useState({
    profilePhotoErr: "",
  });
  const uploadFiles = () => {
    if (validForm()) {
      if (file == null) {
        toast.error("Upload File First!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else {
        setLoader(true);
        const desertRef = ref(storage, `${folder}/${photoName}`);
        deleteObject(desertRef)
          .then(async () => {
            const filestorageRef = ref(
              storage,
              `/${folder}/${teachersID + "-" + file.name}`
            );
            const uploadTask = uploadBytesResumable(
              filestorageRef,
              croppedImage
            );
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // // update progress
                setProgress(percent);
              },
              (err) => console.log(err),
              () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (photourl) => {
                    // console.log(url);

                    try {
                      const docRef = doc(firestore, "userteachers", id);
                      await updateDoc(docRef, {
                        url: photourl,
                        photoName: teachersID + "-" + file.name,
                      });
                      const docRef2 = doc(firestore, "profileImage", id);
                      await updateDoc(docRef2, {
                        url: photourl,
                        fileName: teachersID + "-" + file.name,
                      });
                      const url = `/api/updateProfileImage`;
                      const response = await axios.post(url, {
                        id,
                        url: photourl,
                        photoName: teachersID + "-" + file.name,
                      });
                      const record = response.data;
                      if (record.success) {
                        toast.success(
                          "Congrats! Profile Image Changed Successfully!"
                        );

                        setSrc(null);

                        setLoader(false);
                        setDisabled(true);
                        setProgress(0);
                        setCroppedImage(null);
                        setCroppedPreview(null);
                        setFile(null);
                        let userdetails = decryptObjData("uid");
                        let newUserDetails = {
                          ...userdetails,
                          url: photourl,
                          photoName: teachersID + "-" + file.name,
                        };

                        encryptObjData("uid", newUserDetails, 10080);
                        setUSER(newUserDetails);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      } else {
                        toast.error("Failed to Change Image!");
                      }
                    } catch (e) {
                      toast.success("File Upload Failed!", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,

                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setLoader(false);
                    }
                  }
                );
              }
            );
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
            toast.error("Something Went Wrong!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    }
  };
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      profilePhotoErr: "",
    });

    if (!file.name) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        profilePhotoErr: "Please Upload Profile Picture",
      }));
    }
    if (!croppedImage) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        profilePhotoErr:
          "Please Properly Select & Crop Profile Picture As Shown In the Picture",
      }));
    }
    return formIsValid;
  };
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setSrc(URL.createObjectURL(selectedFile));
        setCroppedImage(null);
        setCroppedPreview(null);
      } else {
        toast.error("Please select an image file.");
      }
    }
  };

  // Handle cropped image from ImageCropper
  const handleCroppedImage = useCallback((blob) => {
    setCroppedImage(blob);
    setCroppedPreview(URL.createObjectURL(blob));
    setDisabled(false);
  }, []);

  // Handle cancel cropping
  const handleCancelCrop = useCallback(() => {
    setSrc(null);
    setFile(null);
    setCroppedImage(null);
    setCroppedPreview(null);
    setDisabled(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // Reset cropping and file input
  const resetCropping = useCallback(() => {
    setCroppedPreview(null);
    setCroppedImage(null);
    setSrc(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Change Photo";
    if (!state) {
      router.push("/logout");
    }
  });
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {loader ? <Loader /> : null}
      <div className="container my-5">
        <div className="col-md-6 mx-auto">
          <h3 className="text-center text-primary mb-3">Current Photo</h3>
          <img src={url} alt="profile" className="profileImage" />
        </div>
        <div className="col-md-12 mx-auto">
          <h3 className="text-center text-primary mb-3">Change Photo</h3>
          <div className="mb-3">
            <div className="mb-3">
              <div className="col-md-6 m-auto">
                <label htmlFor="" className="form-label">
                  Press Choose File, Select Your Image File And Select Crop Area
                  before pressing crop on Image As Shown in Picture
                </label>
                {!file && (
                  <img
                    src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Crop.gif"
                    alt="select"
                    className="mb-3 mx-auto w-25 img-fluid"
                    style={{
                      width: "25%",
                    }}
                  />
                )}
                <input
                  type="file"
                  id="file-upload"
                  className="form-control"
                  placeholder="Upload Document"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                {errField.profilePhotoErr && (
                  <span className="error">{errField.profilePhotoErr}</span>
                )}
              </div>

              {src && !croppedPreview && (
                <ImageCropper
                  src={src}
                  onCropComplete={handleCroppedImage}
                  onCancel={handleCancelCrop}
                />
              )}

              {croppedPreview && (
                <div className="col-md-6 text-center m-auto">
                  <p className="fw-bold">Profile Preview:</p>
                  <img
                    src={croppedPreview}
                    alt="profilePhoto"
                    className="img-fluid rounded border p-1"
                    style={{ maxHeight: "200px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-warning btn-sm m-2"
                    onClick={resetCropping}
                  >
                    Re-crop Image
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            className="progress-bar"
            style={{
              width: progress + "%",
              height: "15px",
              backgroundColor: "purple",
              borderRadius: "10px",
              transformOrigin: "start",
            }}
          ></div>
          <div className="my-3">
            {croppedPreview && (
              <button
                type="button"
                className="btn btn-success"
                disabled={disabled}
                onClick={uploadFiles}
              >
                Upload Image
              </button>
            )}
          </div>
          <div className="mx-auto noprint mb-5">
            <button
              type="button"
              className="btn btn-info text-white font-weight-bold p-2 rounded"
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePhoto;
