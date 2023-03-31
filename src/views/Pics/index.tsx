import http from "@/utils/axios";
import { useEffect, useMemo, useState } from "react";
import Picture from "@/components/Picture";
import "./index.less";
import { message, notification } from "antd";

type prop = {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: string;
  Owner: {
    ID: string;
    DisplayName: string;
  };
  StorageClass: string;
};

const Pics = () => {
  const [pics, setPics] = useState<prop[]>([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    http.get("/api/files").then((res) => {
      setPics(res.data);
      api.info({
        message: `欢迎体验R图床，展示版本！`,
        description: "请不要随意删除资源，谢谢配合！",
        placement: "topRight",
      });
    });
  }, []);

  const orderPicList = useMemo(() => {
    return pics.sort((a, b) => {
      return (
        new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime()
      );
    });
  }, [pics]);

  return (
    <div className="pics">
      {contextHolder}
      {orderPicList.length > 0 ? (
        orderPicList.map((el) => {
          return (
            <Picture
              ext={"png"}
              key={el.Key}
              width="100"
              fileName={el.Key.split("/")[1]}
              src={el.Key}
            />
          );
        })
      ) : (
        <div>暂无文件</div>
      )}
    </div>
  );
};

export default Pics;
