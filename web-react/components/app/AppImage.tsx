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

  const renderContent = () => <Image {...(rest as ImageProps)} />;

  return wrapperClass ? (
    <span className={wrapperClass}>{renderContent()}</span>
  ) : (
    <>{renderContent()}</>
  );
};

AppImage.defaultProps = {
  draggable: false,
};
export default AppImage;
