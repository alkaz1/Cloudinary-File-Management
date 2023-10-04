import React, { useState } from "react";

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const ImageUpload = () => {
  console.log(CLOUDINARY_UPLOAD_PRESET)
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
      .then((data) => {
        setIsLoading(true);
        if (data.secure_url !== '') {
          const uploadedFileUrl = data.secure_url;
          localStorage.setItem('passportUrl', uploadedFileUrl);
          console.log(uploadedFileUrl)
        }
      })

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit" disabled={isLoading}>
        Upload
      </button>
    </form>
  );
};

export default ImageUpload;
