import { useQuery } from "react-query";
import profileAPI from "../../api/profile";
import { useAuthContext } from "../../context/AuthContext";

const useProfile = (username) => {
  const response = useQuery(`profile-${username}`, () =>
    profileAPI.getProfile(username)
  );

  return { response };
};

export default useProfile;
