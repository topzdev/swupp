import { useQuery } from "react-query";
import profileAPI from "../../api/profile";
import { useAuthContext } from "../../context/AuthContext";

const useProfilePost = (username) => {
  const response = useQuery(`profilePost-${username}`, () =>
    profileAPI.getProfilePost(username)
  );

  return { ...response };
};

export default useProfilePost;
