import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./index.less";

import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { message, Button, Popconfirm } from "antd";
import { useInViewport } from "ahooks";
import http from "@/utils/axios";

interface IProps {
  src: string;
  width: string;
  fileName: string;
  ext: string;
}

const picture: FC<IProps> = ({ src, width, fileName, ext }) => {
  const imgRef = useRef<HTMLDivElement>(null);

  // 复制
  const handleCopy = useCallback(
    () => message.success("CDN 链接复制成功！👍"),
    [src]
  );
  // 删除
  const handleDelete = useCallback(
    () => message.success("图片删除成功！"),
    [src]
  );

  // CDN 链接
  const cdnUrl = useMemo(() => "https://cdn.redlonely.com/" + src, [src]);

  const confirm = async (key: string) => {
    const { code }: { code: number } = await http.delete("/api/delete", {
      params: { key },
    });
    if (code === 204 || 200) {
      message.success("删除成功！");
      imgRef.current?.remove();
    } else {
      message.error("删除失败！");
    }
  };

  const fullSrc = useMemo(
    () => "https://cdn.redlonely.com/" + src + "/thumbnail",
    [src]
  );

  return (
    <div className="picture-container" ref={imgRef}>
      <img className="picture" width={width} src={fullSrc} alt={src} />
      <div className="btns py-2 flex justify-center gap-2">
        <CopyToClipboard text={cdnUrl} onCopy={handleCopy}>
          <Button title='复制CDN链接' icon={<CopyOutlined />}></Button>
        </CopyToClipboard>
        <Popconfirm
          title={"确定要删除么？"}
          description="从COS中删除图片！"
          onConfirm={() => confirm(src)}
        >
          <Button title='删除文件' icon={<DeleteOutlined />}></Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default picture;
