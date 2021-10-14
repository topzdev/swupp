import { useQuery } from "react-query";
import profileAPI from "../../api/profile";

const useProfileAbout = (username) => {
  const response = useQuery(`profileAbout-${username}`, () =>
    profileAPI.getProfileAbout(username)
  );

  return { ...response };
};

export default useProfileAbout;
