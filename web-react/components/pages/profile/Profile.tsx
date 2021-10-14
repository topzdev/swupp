import React from "react";
import { useProfileContext } from "../../../context/ProfileContext";
import useProfile from "../../../hooks/profile/useProfile";
import AppLink from "../../app/AppLink";
import ProfilePhoto from "../../pages/profile/ProfilePhoto";
import ProfileCoverPhoto from "./ProfileCoverPhoto";
import ProfilePhotoModal from "./ProfilePhotoModal";

interface ProfileProps {
  username: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
  const { setShowChangeProfile, showChangeProfile, setProfile } =
    useProfileContext();

  const { response } = useProfile(username);

  const links = {
    profile: `/profile/${username}`,
    about: `/profile/${username}/about`,
    address: `/profile/${username}/address`,
  };

  const pageTitle = `@${username} - Profile`;

  if (response.isLoading) return <>Loading...</>;
  if (response.isError) return <>Something went wrong</>;

  const profile = response.data;

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
              <AppLink
                nav
                href={links.profile}
                className="profile__tab-link"
                exact
                scroll={false}
              >
                <span className="profile__tab-label"> Post </span>
                {/* <span className="profile__tab-count">{{ profile.postCount }}</span> */}
              </AppLink>
            </li>
            <li className="profile__tab-item">
              <AppLink
                nav
                href={links.about}
                scroll={false}
                className="profile__tab-link"
              >
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
