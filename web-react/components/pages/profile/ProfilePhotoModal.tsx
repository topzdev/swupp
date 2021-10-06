import React, { useState } from "react";
import { CloseIcon } from "../../../configs/Icons";
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
  const [_coverPhoto, setCoverPhoto] = useState(coverPhoto);
  const [_profilePhoto, setProfilePhoto] = useState(profilePhoto);

  const close = () => {
    setShow(false);
  };

  const remove = (type: "cover" | "profile") => {};

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
                {/* <img v-if="coverPhoto" :src="coverPhoto" alt="Cover photo" /> */}
                {coverPhoto && <AppImage src={_coverPhoto.url} />}

                <div className="change-profile__floater">
                  {/* <Button
                  :icon="icons.camera"
                  title="Edit"
                  @click.native="$refs.coverPhoto.click()"
                ></Button>
                <button-icon
                  :icon="icons.close"
                  title="Remove"
                  @click.native="remove('cover')"
                /> */}
                </div>
              </div>
              {/* <input
              type="file"
              name=""
              ref="profilePhoto"
              id="profile-photo"
              hidden
              @change="onUploadPhotos($event, 'profilePhoto')"
            />
            <input
              type="file"
              name=""
              ref="coverPhoto"
              id="cover-photo"
              hidden
              @change="onUploadPhotos($event, 'coverPhoto')"
            /> */}

              <div className="profile__body">
                <div className="profile__photo">
                  <div className="profile__photo-holder">
                    {/* <img
                    v-if="profilePhoto"
                    :src="profilePhoto"
                    alt="Profile photo"
                  /> */}
                    <div className="change-profile__floater">
                      {/* <button-icon
                      :icon="icons.camera"
                      title="Edit"
                      @click.native="$refs.profilePhoto.click()"
                    />
                    <button-icon
                      :icon="icons.close"
                      title="Remove"
                      @click.native="remove('profile')"
                    /> */}
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
