import React, { useEffect, useState } from "react";
import { CameraIcon, CloseIcon } from "../../../configs/Icons";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import parseBlobToData from "../../../utils/parseBlobToData";
import AppImage from "../../app/AppImage";
import Button from "../../buttons/Button";
import Card from "../../card/Card";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import BlankProfileImage from "@/assets/img/blank-profile.png";
import useUpdateProfileCoverPhoto, {
  UpdateProfilePhotoDataType,
} from "../../../hooks/profile/useUpdateProfileCoverPhoto";
import { Mutation } from "react-query/types/core/mutation";
import { useProfileContext } from "../../../context/ProfileContext";

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
  const profileFileRef = React.useRef(null);
  const coverFileRef = React.useRef(null);
  const mutation = useUpdateProfileCoverPhoto();
  const { setShowChangeProfile } = useProfileContext();

  const [_coverPhoto, setCoverPhoto] = useState<UpdateProfilePhotoDataType>({
    id: coverPhoto.id,
    publicId: coverPhoto.publicId,
    flag: "default",
    url: coverPhoto.securedUrl,
    photo: null,
  });
  const [_profilePhoto, setProfilePhoto] = useState<UpdateProfilePhotoDataType>(
    {
      id: profilePhoto.id,
      publicId: profilePhoto.publicId,
      flag: "default",
      url: profilePhoto.securedUrl,
      photo: null,
    }
  );

  const { setSnackbar } = useSnackbarContext();

  const close = () => {
    setShow(false);
  };

  const setPhoto = (
    type: "cover" | "profile",
    flag: "update" | "remove",
    url: string,
    photo?: any
  ) => {
    switch (type) {
      case "profile":
        setProfilePhoto((state) => ({
          ...state,
          flag,
          url,
          photo,
        }));
        break;
      case "cover":
        setCoverPhoto((state) => ({
          ...state,
          flag,
          url,
          photo,
        }));
        break;
    }
  };

  const onRemovePhotos = (type: "cover" | "profile") => {
    setPhoto(type, "remove", null);
  };

  const onUploadPhotos = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const reader = new FileReader();
    const photo = event.target.files;

    if (photo.length) {
      reader.onload = () => {
        setPhoto(type, "update", reader.result as any, photo[0]);
      };
      reader.readAsDataURL(photo[0]);
    }
  };

  const onSave = async () => {
    console.log("Before Uploading", _profilePhoto, _coverPhoto);

    await mutation.mutate(
      { profile: _profilePhoto, cover: _coverPhoto },
      {
        onSuccess() {
          setSnackbar({
            show: true,
            title: "Photo and Cover Photo",
            body: "Photo Updated Successfully",
            type: "success",
            timeout: 5000,
          });
          setShowChangeProfile(false);
        },

        onError() {
          setSnackbar({
            show: true,
            title: "Something went wrong...",
            body: "Pleae update photos later",
            type: "error",
            timeout: 3000,
          });
          setShowChangeProfile(false);
        },
      }
    );
  };

  if (!show) return <></>;

  return (
    <div className="backdrop">
      <div className="dialog">
        <Card loading={mutation.isLoading} rounded>
          <CardHeader className="mb-1">
            <h2 className="mr-auto">Change Profile photo and cover</h2>
            <Button icon color="secondary" pressed size="large" onClick={close}>
              <CloseIcon />
            </Button>
          </CardHeader>
          <CardBody>
            <div className="change-profile">
              <div className="profile__cover">
                {_coverPhoto.url && (
                  <AppImage src={_coverPhoto.url} layout="fill" />
                )}

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
                  <Button
                    className="btn-change-profile"
                    title="Close"
                    onClick={() => onRemovePhotos("cover")}
                  >
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
                    {_profilePhoto.url && (
                      <AppImage src={_profilePhoto.url} layout="fill" />
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
                      <Button
                        className="btn-change-profile"
                        title="Close"
                        onClick={() => onRemovePhotos("profile")}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <CardHeader className="mt-2">
            <Button
              disabled={
                _profilePhoto.flag === "default" &&
                _coverPhoto.flag === "default"
              }
              className="ml-auto mr-1"
              color="primary"
              size="medium"
              onClick={onSave}
              loading={mutation.isLoading}
            >
              Save
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePhotoModal;
