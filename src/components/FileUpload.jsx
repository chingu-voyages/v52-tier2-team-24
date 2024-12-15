import  { useState, useEffect } from "react";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import receipt from "../images/Ticket.svg";
import upload from "../images/Upload.svg";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileKey, setUploadedFileKey] = useState("");

  const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  const AWS_REGION = import.meta.env.VITE_AWS_REGION;
  const AWS_BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

  useEffect(() => {
    const storedFileKey = localStorage.getItem("uploadedFileKey");
    if (storedFileKey) {
      setUploadedFileKey(storedFileKey);
    }
  }, []);

  const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    setUploading(true);

    const fileKey = `receipts/${Date.now()}-${file.name}`;

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file,
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      setUploadedFileKey(fileKey);
      localStorage.setItem("uploadedFileKey", fileKey);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async () => {
    if (!uploadedFileKey) {
      alert("No file has been uploaded yet");
      return;
    }

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: uploadedFileKey,
    };

    try {
      const data = await s3Client.send(new GetObjectCommand(params));
      const body = data.Body;
      const blob = await new Response(body).blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedFileKey.split("/").pop();
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />

      <label htmlFor="file-input" style={{ cursor: "pointer" }}>
        <img src={upload} alt="Upload Receipt" />
      </label>

      {file && (
        <button onClick={uploadFile} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}
      {uploadedFileKey && (
        <button onClick={downloadFile}>
          <img src={receipt} alt="Download Receipt" />
        </button>
      )}
    </div>
  );
};

export default FileUpload;
