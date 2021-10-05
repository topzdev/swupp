import React from "react";
import AppImage from "../../app/AppImage";
import BlankProfileImage from "@/assets/img/blank-profile.png";
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
    </div>
  );
};

export default ProfilePhoto;
