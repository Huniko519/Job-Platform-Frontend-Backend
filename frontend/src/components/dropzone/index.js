import React from "react";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { FaUpload, FaTimes } from "react-icons/fa";

const CustomDropzone = ({ handleUploads }) => {
  const handleSubmit = (files, allFiles) => {
    // console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
   // console.log(files);
  };

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        handleUploads(chosenFiles.map((f) => f.fileObject));
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  const removeFile = () => {};

  const Preview = ({ meta }) => {
    const { previewUrl, name } = meta;

    return (
      <div className="dropzone-preview">
        <img className="dropzone-previewImage" src={previewUrl} alt={name} />
        <span className="dropzone-preview-remove" onClick={() => removeFile()}>
          <FaTimes size={24} />
        </span>
      </div>
    );
  };
  const Layout = ({
    input,
    previews,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }) => {
    return (
      <div className="dropzone-job">
        <div className="dropzone-preview-wrapper">{previews}</div>
        <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
      </div>
    );
  };
  const Upload = ({ accept, onFiles, files, getFilesFromEvent }) => {
    return (
      <label className="btn btn-primary dropzone-upload">
        <FaUpload /> Upload
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    );
  };
  return (
    <Dropzone
      classNames={{
        dropzone: "dropzone-job",
        submitButtonContainer: "dropzone-submit",
        preview: "dropzone-preview",
      }}
      accept="image/*,audio/*,video/*,.pdf"
      //    getUploadParams={() => ({url: 'https://httpbin.org/post'})}
      onSubmit={handleSubmit}
      getFilesFromEvent={getFilesFromEvent}
      LayoutComponent={Layout}
      InputComponent={Upload}
      PreviewComponent={Preview}
    />
  );
};

export default CustomDropzone;
