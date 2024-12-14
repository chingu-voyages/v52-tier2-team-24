import React, { useState } from 'react';
import AWS from 'aws-sdk';
// import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME} from '../../aws-config';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = import.meta.env.VITE_AWS_REGION;
const AWS_BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);

   AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: AWS_REGION,
      });

    const s3 = new AWS.S3();

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: `receipts/${Date.now()}-${file.name}`,
      Body: file
    };

    try {
      await s3.upload(params).promise();
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Receipt'}
      </button>
    </div>
  );
};

export default FileUpload;
