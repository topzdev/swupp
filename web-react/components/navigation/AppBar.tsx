import { useRouter } from "next/dist/client/router";
import React from "react";
import { useState } from "react";
import { ArrowDownIcon, MessageIcon } from "../../configs/Icons";
import { useAuthContext } from "../../context/AuthContext";
import AppLink from "../app/AppLink";
import AppLogo from "../app/AppLogo";
import ButtonIcon from "../buttons/ButtonIcon";
import ProfileIcon from "../profile/ProfileIcon";
import ClickOutside from "../utils/ClickOutside";
import AppBarMenu from "./AppBarMenu";

interface AppBarProps {
  variant?: string;
}

const AppBar: React.FC<AppBarProps> = ({ variant }) => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);

  const classlist = ["navbar"];

  if (variant) {
    classlist.push("navbar-post");
  }

  const gotoTradeChat = () => {
    router.push("/trade");
  };

  const toggleAppBarMenu = () => {
    setShowMenu((state) => !state);
  };

  return (
    <nav className={classlist.join(" ")}>
      <div className="container">
        <AppLogo className="navbar__logo" href="/" />

        <div className="navbar__actions">
          {isLoggedIn ? (
            <>
              <ProfileIcon
                username={user?.username}
                photo={user?.profilePhoto}
                name={user?.firstname}
                id={user?.id}
              />
              <ButtonIcon
                className="mx-1"
                icon={<MessageIcon />}
                onClick={gotoTradeChat}
              />
              <ButtonIcon
                icon={<ArrowDownIcon />}
                className="menu-icon"
                onClick={toggleAppBarMenu}
              />
              <ClickOutside open={showMenu} setClose={setShowMenu}>
                <AppBarMenu />
              </ClickOutside>
            </>
          ) : (
            <>
              <AppLink className="btn btn--link" href="/login">
                Login
              </AppLink>
              <span className="mx-1">or</span>
              <AppLink className="btn btn--link" href="/register">
                Sign Up
              </AppLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
