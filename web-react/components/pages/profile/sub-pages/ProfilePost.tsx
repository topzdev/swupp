import React from "react";
import { PlusIcon } from "../../../../configs/Icons";
import useProfilePost from "../../../../hooks/profile/useProfilePost";
import Button from "../../../buttons/Button";
import PostCard from "../../../post/PostCard";

interface ProfilePostProps {
  username: string;
}

const ProfilePost: React.FC<ProfilePostProps> = ({ username }) => {
  const response = useProfilePost(username);

  //   console.log(posts);

  if (response.isLoading) return <div>Loading...</div>;

  const posts = response.data;

  if (posts.count === 0) return <div>No Post Yet</div>;

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
