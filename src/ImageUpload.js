import React, { useState } from "react";
import './ImageUpload.css'

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const ImageUpload = () => {
  console.log(CLOUDINARY_UPLOAD_PRESET)
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile,setCurrentFile] = useState(null)
  const [allImages,setAllImages] = useState([])
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  setIsLoading(true)


    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      
      return response.json()
    })
      .then((data) => {
        if (data.secure_url !== '') {
          const uploadedFileUrl = data.secure_url;
          localStorage.setItem('passportUrl', uploadedFileUrl);
          setCurrentFile(uploadedFileUrl)
          setAllImages([...allImages,uploadedFileUrl])
          setIsLoading(false);
          console.log(allImages)
        }
      })

  };

  return (<>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit" disabled={isLoading}>
        Upload
      </button>
    </form>
    <div className="recent-upload">
      {!currentFile?<h1>Please upload an image </h1>: allImages.map((image)=>{
        return <img id = "image" src={image}/>
      })}
    </div>
  </>
  );
};

export default ImageUpload;
