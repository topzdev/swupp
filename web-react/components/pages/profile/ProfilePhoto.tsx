import React from "react";
import AppImage from "../../app/AppImage";
import BlankProfileImage from "@/assets/img/blank-profile.png";
import Button from "../../buttons/Button";
import { CameraIcon } from "../../../configs/Icons";
interface ProfilePhotoProps {
  photo: Photo;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photo }) => {
  const photoUrl = photo.securedUrl || BlankProfileImage.src;

  return (
    <div className="profile__photo">
      <div className="profile__photo-holder">
        <AppImage src={photoUrl} layout="fill" />
      </div>
      <Button icon className="profile__photo-btn">
        {<CameraIcon />}
      </Button>
    </div>
  );
};

export default ProfilePhoto;
