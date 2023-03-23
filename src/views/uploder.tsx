import type { UploadProps } from "antd";
import { message, Upload } from "antd";
const { Dragger } = Upload;
import { BoxPlotOutlined } from "@ant-design/icons";

// 参数
const uploadProps: UploadProps = {
  name: "file",
  multiple: true,
  action: "http://localhost:9527/upload",
  beforeUpload(file) {
    return false;
  },
  onChange(info) {
    const { status } = info.file;
    console.log(info);
    // if (status !== "uploading") {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === "done") {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const uploder = () => {
  return (
    <div className="uploader">
      <h2>图片上传</h2>
      <Dragger {...uploadProps} />
    </div>
  );
};

export default uploder;
