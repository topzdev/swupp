import React from "react";
import { PlusIcon } from "../../../../configs/Icons";
import { useAuthContext } from "../../../../context/AuthContext";
import useProfilePost from "../../../../hooks/profile/useProfilePost";
import AppError from "../../../app/AppError";
import Button from "../../../buttons/Button";
import PostCard from "../../../post/PostCard";

interface ProfilePostProps {
  username: string;
}

const ProfilePost: React.FC<ProfilePostProps> = ({ username }) => {
  const { user } = useAuthContext();

  const response = useProfilePost(username);

  //   console.log(posts);

  if (response.isLoading) return <div>Loading...</div>;

  const posts = response.data;

  if (posts.count === 0) {
    if (user.username === username) {
      return <AppError error="me-no-post" />;
    }

    return <AppError error="user-no-post" />;
  }

  return (
    <div className="container mt-3 pb-5">
      <div className="row">
        {posts.items.map((item) => (
          <div key={item.id} className="col-20 mb-2">
            {<PostCard post={item} />}
          </div>
        ))}
      </div>

      <Button color="primary" size="large" icon fab={true}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default ProfilePost;
