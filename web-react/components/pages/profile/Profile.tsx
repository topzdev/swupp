import link from "next/link";
import React, { useEffect, useState } from "react";
import profileAPI, { GetProfileReturn } from "../../../api/profile";
import { useProfileContext } from "../../../context/ProfileContext";
import useProfile from "../../../hooks/profile/useProfile";
import DefaultLayout from "../../../layouts/DefaultLayout";
import AppLink from "../../app/AppLink";
import ProfilePhoto from "../../pages/profile/ProfilePhoto";
import ProfileCoverPhoto from "./ProfileCoverPhoto";
import ProfilePhotoModal from "./ProfilePhotoModal";

interface ProfileProps {
  profile: GetProfileReturn;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const username = profile.user.username;
  const [showChangeProfile, setShowChangeProfile] = useState(true);

  const links = {
    profile: `/profile/${username}`,
    about: `/profile/${username}/about`,
    address: `/profile/${username}/address`,
  };

  const pageTitle = `@${username} - Profile`;
  return (
    <div className="profile mb-4">
      <div className="container">
        <ProfileCoverPhoto coverPhoto={profile.coverPhoto} />

        <div className="profile__body">
          <ProfilePhoto photo={profile.profilePhoto} />
          <div className="profile__names">
            <h1 className="fullname">
              {profile.firstname} {profile.lastname}
            </h1>
            <p className="username">{profile.user.username}</p>
          </div>
        </div>

        <div className="profile__footer">
          <ul className="profile__tab">
            <li className="profile__tab-item">
              <AppLink href={links.profile} className="profile__tab-link">
                <span className="profile__tab-label"> Post </span>
                {/* <span className="profile__tab-count">{{ profile.postCount }}</span> */}
              </AppLink>
            </li>
            <li className="profile__tab-item">
              <AppLink href={links.about} className="profile__tab-link">
                <span className="profile__tab-label"> About </span>
              </AppLink>
            </li>
          </ul>
        </div>
      </div>

      <ProfilePhotoModal
        coverPhoto={profile.coverPhoto}
        profilePhoto={profile.profilePhoto}
        show={showChangeProfile}
        setShow={setShowChangeProfile}
      />
    </div>
  );
};

export default Profile;
