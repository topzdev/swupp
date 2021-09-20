import React from "react";
import AppImage from "../app/AppImage";
import blankProfileImage from "@/assets/img/blank-profile.png";

interface ProfilePhotoProps {
  url?: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ url }) => {
  let profileSrc: any = url;

  if (!url) {
    profileSrc = blankProfileImage;
  }

  return (
    <div className="profile__photo-holder">
      <AppImage src={profileSrc} alt="Profile Photo" />
    </div>
  );
};

export default ProfilePhoto;
