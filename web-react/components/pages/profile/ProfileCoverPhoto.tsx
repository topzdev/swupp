import React from "react";
import AppImage from "../../app/AppImage";
import Button from "../../buttons/Button";

interface ProfileCoverPhotoProps {
  coverPhoto: CoverPhoto;
}

const ProfileCoverPhoto: React.FC<ProfileCoverPhotoProps> = ({
  coverPhoto,
}) => {
  return (
    <div className="profile__cover">
      {coverPhoto && (
        <AppImage src={coverPhoto.securedUrl} layout="fill" alt="Cover photo" />
      )}

      <Button>Change Cover Photo</Button>
    </div>
  );
};

export default ProfileCoverPhoto;
