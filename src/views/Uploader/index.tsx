import { Image, UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;
import { BoxPlotOutlined, InboxOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { Button } from "antd";
import http from "@/utils/axios";
import { useNavigate } from "react-router";

const Uploader = () => {
  const draggerRef = useRef<typeof Dragger>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const Nav = useNavigate();

  // 参数
  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    maxCount: 1,
    fileList,
    beforeUpload(file) {
      // 返回 false 禁止组件自动上传
      return false;
    },
    onChange(info) {
      let newFileList = [...info.fileList];
      if (info.fileList.length >= 10) {
        message.warning("已到达最大提交值！");
      }
      setFileList(newFileList);
    },
  };

  // 直接上传
  const handelUpload = async () => {
    if (fileList.length <= 0) return message.warning("请先上传至少一个文件！");
    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj as Blob, "file");
    const { code }: { code: number } = await http.post("/api/upload", formData);
    if (code === 200) {
      message.success("上传成功！");
      setFileList([]);
    }
  };

  const onPreview = async (url: string) => {
    window.open(url);
  };

  return (
    <div className="uploader max-w-[500px] mx-auto">
      <h2 className="text-2xl p-10">图片上传</h2>
      <Dragger ref={draggerRef} {...uploadProps}>
        {fileList.length > 0 ? (
          fileList.map((file: UploadFile) => {
            const url = URL.createObjectURL(file.originFileObj as Blob);
            return (
              <img
                key={file.uid}
                onClick={() => onPreview(url)}
                src={url}
                alt={file.uid}
                className="w-[250px] h-[250px] rounded-lg shadow object-cover"
              />
            );
          })
        ) : (
          <div>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">禁止上传非图片文件！</p>
          </div>
        )}
      </Dragger>
      {/* <h2 className="text-2xl p-10">图片预览</h2>
      <div className="previte-box flex justify-start flex-wrap gap-[15px]">
        {fileList.map((file: UploadFile) => {
          const url = URL.createObjectURL(file.originFileObj as Blob);
          return (
            <img
              key={file.uid}
              onClick={() => onPreview(url)}
              src={url}
              alt={file.uid}
              className="w-[150px] h-[150px] rounded-lg shadow object-cover"
            />
          );
        })}
      </div>
      <div>{fileList.length}/10</div> */}
      <Button
        disabled={fileList.length <= 0}
        className="w-[150px] mt-10"
        onClick={handelUpload}
      >
        上传
      </Button>
    </div>
  );
};

export default Uploader;
