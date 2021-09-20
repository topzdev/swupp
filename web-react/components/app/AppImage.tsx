import React from "react";
import Image, { ImageProps } from "next/image";

type ImageHTMLTypes = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export type AppImageProps = {
  legacy?: boolean;
  wrapperClass?: string;
} & (ImageProps | ImageHTMLTypes);

const AppImage: React.FC<AppImageProps> = (props) => {
  const { legacy, wrapperClass, ...rest } = props;

  if (legacy) return <img {...(rest as ImageHTMLTypes)} />;

  return (
    <span className={wrapperClass}>
      <Image {...(rest as ImageProps)} />
    </span>
  );
};

AppImage.defaultProps = {
  draggable: false,
};
export default AppImage;
