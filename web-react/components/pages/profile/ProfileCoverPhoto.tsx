import React from "react";
import { useProfileContext } from "../../../context/ProfileContext";
import AppImage from "../../app/AppImage";
import Button from "../../buttons/Button";

interface ProfileCoverPhotoProps {
  coverPhoto: CoverPhoto;
}

const ProfileCoverPhoto: React.FC<ProfileCoverPhotoProps> = ({
  coverPhoto,
}) => {
  const { setShowChangeProfile } = useProfileContext();
  return (
    <div className="profile__cover">
      {coverPhoto?.securedUrl && (
        <AppImage src={coverPhoto.securedUrl} layout="fill" alt="Cover photo" />
      )}

      <Button
        className="profile-cover-button"
        onClick={() => setShowChangeProfile(true)}
      >
        Change Cover Photo
      </Button>
    </div>
  );
};

export default ProfileCoverPhoto;
