import React from "react";
import { LogoutIcon, SettingsIcon } from "../../configs/Icons";
import { useAuthContext } from "../../context/AuthContext";
import AppLink from "../app/AppLink";
import ProfileIcon from "../profile/ProfileIcon";

interface AppBarMenuProps {}

const AppBarMenu: React.FC<AppBarMenuProps> = ({}) => {
  const { isLoggedIn, user } = useAuthContext();
  return (
    <div className="menu">
      {isLoggedIn && (
        <>
          <ProfileIcon
            className={"menu__profile"}
            username={user?.username}
            photo={user?.profile.profilePhoto}
            name={`${user?.profile.firstname} ${user?.profile.lastname}`}
            caption="Visit your profile"
          />
          <div className="separator"></div>{" "}
        </>
      )}

      <ul className="menu__list">
        <li className="menu__item">
          <AppLink href="/settings" className="menu__link">
            <span className="menu__link-icon">
              <SettingsIcon />
            </span>
            <span className="menu__link-text"> Account Settings </span>
          </AppLink>
        </li>
        <li className="menu__item">
          <button className="menu__link">
            <span className="menu__link-icon">
              <LogoutIcon />
            </span>
            <span className="menu__link-text"> Logout </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AppBarMenu;
