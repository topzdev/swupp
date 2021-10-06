import React, { useCallback, useContext, useState } from "react";
import { useMemo } from "react";
import { GetProfileReturn } from "../api/profile";

type ProfileContextType = {
  setProfile: React.Dispatch<React.SetStateAction<GetProfileReturn>>;
  profile: GetProfileReturn;
  changeProfilePhoto: (photo: ProfilePhoto) => void;
};

export const ProfileContext = React.createContext<ProfileContextType>(
  {} as ProfileContextType
);

const ProfileContextProvider: React.FC = ({ children }) => {
  const [profile, setProfile] = useState<GetProfileReturn>(null);

  const changeProfilePhoto = useCallback((photo: ProfilePhoto) => {
    setProfile((state) => {
      if (!state) return state;

      return { ...state, profilePhoto: photo };
    });
  }, []);

  const changeCoverPhoto = useCallback((photo: CoverPhoto) => {
    setProfile((state) => {
      if (!state) return state;

      return { ...state, coverPhoto: photo };
    });
  }, []);

  const providerValue = useMemo(
    () => ({ profile, setProfile, changeProfilePhoto, changeCoverPhoto }),
    [profile, setProfile, changeProfilePhoto, changeCoverPhoto]
  );

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

export default ProfileContextProvider;
