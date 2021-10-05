import { useQuery } from "react-query";
import profileAPI from "../../api/profile";
import { useAuthContext } from "../../context/AuthContext";

const useProfile = (username) => {
  const response = useQuery(["profile", username], () =>
    profileAPI.getProfile(username)
  );

  const links = {
    profile: `/profile/${username}`,
    about: `/profile/${username}/about`,
    address: `/profile/${username}/address`,
  };

  const pageTitle = `@${username} - Profile`;

  return { pageTitle, links, response };
};

export default useProfile;
