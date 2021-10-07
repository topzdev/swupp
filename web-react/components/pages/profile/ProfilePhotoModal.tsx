import React, { useState } from "react";
import { CameraIcon, CloseIcon } from "../../../configs/Icons";
import parseBlobToData from "../../../utils/parseBlobToData";
import AppImage from "../../app/AppImage";
import Button from "../../buttons/Button";
import Card from "../../card/Card";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";

interface ProfilePhotoModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  coverPhoto: CoverPhoto | null;
  profilePhoto: ProfilePhoto | null;
}

const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  show,
  setShow,
  coverPhoto,
  profilePhoto,
}) => {
  const loading = false;
  const profileFileRef = React.useRef(null);
  const coverFileRef = React.useRef(null);

  const [_coverPhoto, setCoverPhoto] = useState(coverPhoto.securedUrl);
  const [_profilePhoto, setProfilePhoto] = useState(profilePhoto.securedUrl);

  const close = () => {
    setShow(false);
  };

  const remove = (type: "cover" | "profile") => {
    if (type) {
    }
  };

  const onUploadPhotos = async (
    event: React.ChangeEvent<HTMLInputElement>,
    where: "profile" | "cover"
  ) => {
    const reader = new FileReader();
    const photo = event.target.files;

    if (photo.length) {
      reader.onload = () => {
        if (where === "profile") setProfilePhoto(reader.result as any);
        if (where === "cover") setCoverPhoto(reader.result as any);
      };
      reader.readAsDataURL(photo[0]);
    }
  };

  return (
    <div className="backdrop">
      <div className="dialog">
        <Card loading={loading} rounded>
          <CardHeader className="mb-1">
            <h2 className="mr-auto">Change Profile photo and cover</h2>
            <Button icon color="secondary" pressed size="large" onClick={close}>
              <CloseIcon />
            </Button>
          </CardHeader>
          <CardBody>
            <div className="change-profile">
              <div className="profile__cover">
                {_coverPhoto && <AppImage src={_coverPhoto} layout="fill" />}

                <div className="change-profile__floater">
                  <Button
                    className="btn-change-profile"
                    title="Edit"
                    onClick={() => {
                      coverFileRef.current.click();
                    }}
                  >
                    <CameraIcon />
                  </Button>
                  <Button className="btn-change-profile" title="Close">
                    <CloseIcon />
                  </Button>
                </div>
              </div>
              <input
                type="file"
                name="profile"
                ref={profileFileRef}
                id="profile-photo"
                accept="image/png, image/jpeg"
                onChange={(e) => onUploadPhotos(e, "profile")}
                hidden
              />
              <input
                type="file"
                name="cover"
                ref={coverFileRef}
                id="cover-photo"
                accept="image/png, image/jpeg"
                onChange={(e) => onUploadPhotos(e, "cover")}
                hidden
              />

              <div className="profile__body">
                <div className="profile__photo">
                  <div className="profile__photo-holder">
                    {_profilePhoto && (
                      <AppImage src={_profilePhoto} layout="fill" />
                    )}
                    <div className="change-profile__floater">
                      <Button
                        className="btn-change-profile"
                        title="Edit"
                        onClick={() => {
                          profileFileRef.current.click();
                        }}
                      >
                        <CameraIcon />
                      </Button>
                      <Button className="btn-change-profile" title="Close">
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <CardHeader className="mt-2">
            <Button className="ml-auto mr-1" color="primary" size="medium">
              Save
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePhotoModal;
