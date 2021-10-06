import link from "next/link";
import React from "react";
import useProfile from "../../../hooks/profile/useProfile";
import DefaultLayout from "../../../layouts/DefaultLayout";
import AppLink from "../../app/AppLink";
import ProfilePhoto from "../../pages/profile/ProfilePhoto";
import ProfileCoverPhoto from "./ProfileCoverPhoto";
import ProfilePhotoModal from "./ProfilePhotoModal";

interface ProfileProps {
  username: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
  const { links, response } = useProfile(username);

  const profile = response.data;

  if (response.isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

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
            <p className="username">{username}</p>
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

      <ProfilePhotoModal />
    </div>
  );
};

export default Profile;
