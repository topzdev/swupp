import { useRouter } from "next/router";
import React from "react";
import { EditIcon } from "../../configs/Icons";
import { useAuthContext } from "../../context/AuthContext";
import { Post, User } from "../../global";

interface PostCardOptionsMenuProps {
  username?: string;
  id: Post["id"];
  user: User;
}

const PostCardOptionsMenu: React.FC<PostCardOptionsMenuProps> = ({
  user,
  id,
  username,
}) => {
  const router = useRouter();
  const auth = useAuthContext();
  const isMyPost =
    auth.isLoggedIn &&
    auth.user &&
    auth.user.id.toString() === user.id?.toString();

  const gotoEdit = () => {
    return router.push(`/post/${user.username}/edit/${id}`);
  };
  return (
    <div className="card--post__options-list">
      <ul>
        {isMyPost && (
          <li onClick={gotoEdit}>
            <EditIcon className="icons" /> Edit
          </li>
        )}
        {/* <li><app-icon class="icons" :path="icons.report"></app-icon> Report</li> */}
      </ul>
    </div>
  );
};

export default PostCardOptionsMenu;
