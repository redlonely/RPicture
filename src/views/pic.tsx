import http from "@/utils/axios";
import { useEffect, useState } from "react";
import "./pic.less";
import Picture from "@/components/Picture";

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

const setup = () => {
  const [pics, setPics] = useState<prop[]>([]);

  useEffect(() => {
    http.get("/api/files").then((res) => {
      console.log(res);
      // setPics(res.data);
      setPics([]);
    });
  }, []);

  return (
    <div className="pics">
      {pics.length > 0 ? (
        pics.map((el) => {
          return (
            <Picture
              width="100"
              src={"https://cdn.redlonely.com/" + el.Key + "/thumbnail"}
            />
          );
        })
      ) : (
        <div>暂无文件</div>
      )}
    </div>
  );
};

export default setup;
