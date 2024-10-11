import  { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageFile) {
      setMessage('Please provide both name and image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('imageFile', imageFile);

    try {
      const res = await axios.post('http://localhost:3001/api/v1/mediaUpload/uploadCloud', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message || 'Image uploaded successfully');
    } catch (err) {
      console.error(err);
      setMessage('Error uploading image');
    }
  };

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Image: </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
