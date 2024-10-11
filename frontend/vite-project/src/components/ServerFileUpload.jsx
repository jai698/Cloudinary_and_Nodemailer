import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle text input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name) {
      alert('Please provide both a file and a name.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      const response = await axios.post('http://localhost:3001/api/v1/mediaUpload/localFileUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    }
  };

  return (
    <div>
      <h2>File Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>File: </label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
