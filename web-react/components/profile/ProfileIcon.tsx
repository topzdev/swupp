import { useRouter } from "next/router";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";

type ProfileIconProps = {
  username?: string;
  name?: string;
  caption?: string;
  photo?: string;
  id?: number | string;
  className?: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ProfileIcon: React.FC<ProfileIconProps> = ({
  username,
  name,
  caption,
  photo,
  id,
  className,
}) => {
  const router = useRouter();
  const classlist = ["profile-icon", className];
  const gotoProfile = () => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className={classlist.join(" ")} onClick={gotoProfile}>
      <div className="profile-icon__photo">
        <ProfilePhoto url={photo} />
      </div>

      <div className="profile-icon__body">
        <div className="profile-icon__name">{name}</div>
        {caption && <div className="profile-icon__caption">{caption}</div>}
      </div>
    </div>
  );
};

export default ProfileIcon;
