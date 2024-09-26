"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Store";
const page = () => {
  const { USER } = useGlobalContext();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const saveImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "slides");
    data.append("cloud_name", cloudName);
    data.append("file_name", USER.id + "-" + image.name);

    try {
      if (image === null) {
        return toast.error("Please Upload image");
      }

      // const res = await fetch(
      //   `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      //   {
      //     method: "POST",
      //     body: data,
      //   }
      // );
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      await axios
        .post(url, data)
        .then((data) => {
          setUrl(data.data.secure_url);
          toast.success("Image uploaded successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to Upload Image");
        });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Upload Image");
    }
  };
  useEffect(() => {
    console.log(USER);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <div className="col-md-6 mx-auto">
        <h1>Image Upload</h1>
        <label
          htmlFor="file-upload"
          className="my-3"
          suppressHydrationWarning={true}
        >
          {image ? (
            <div>
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt="img"
                style={{ width: "40vw", height: "auto" }}
              />
              <button className="btn btn-primary my-3" onClick={saveImage}>
                Send
              </button>
            </div>
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
              className="h-20 w-20"
            />
          )}
        </label>
        <input
          id="file-upload"
          className="form-control mb-3 d-none"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {url && <img src={url} style={{ width: "40vw", height: "auto" }} />}
      </div>
    </div>
  );
};

export default page;
