import React from "react";
import AppImage from "../app/AppImage";
import blankProfileImage from "@/assets/img/blank-profile.png";

interface MiniProfilePhotoProps {
  photo: Photo;
}

const MiniProfilePhoto: React.FC<MiniProfilePhotoProps> = ({ photo }) => {
  let profileSrc: any = photo.securedUrl;

  if (!photo.securedUrl) {
    profileSrc = blankProfileImage.src;
  }

  return (
    <div className="profile__photo-holder">
      <AppImage legacy src={profileSrc} alt="Profile Photo" />
    </div>
  );
};

export default MiniProfilePhoto;
