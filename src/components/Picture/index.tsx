import { FC } from "react";

interface IProps {
  src: string;
  width: string;
}

const picture: FC<IProps> = ({ src, width }) => {
  return (
    <div className="pic">
      <img width={width} src={src} alt="" />
    </div>
  );
};

export default picture;
