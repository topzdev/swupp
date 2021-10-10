import { useMutation } from "react-query";
import profileAPI from "../../api/profile";

export type UpdateProfilePhotoDataType = {
  id: number;
  flag: "update" | "default" | "remove";
  publicId: string;
  url: string;
  photo: any;
};

type UpdateProfilePhotoParamsType = {
  profile: UpdateProfilePhotoDataType;
  cover: UpdateProfilePhotoDataType;
};

const updateProfileCoverPhotos = async ({
  profile,
  cover,
}: UpdateProfilePhotoParamsType) => {
  let profileData, coverData;

  console.log("Updating...", profile, cover);

  if (profile.flag === "update") {
    profileData = await profileAPI.updateProfilePhoto(profile);
  } else if (profile.flag === "remove") {
    profileData = await profileAPI.removeProfilePhoto(profile);
  }

  if (cover.flag === "update") {
    coverData = await profileAPI.updateCoverPhoto(cover);
  } else if (cover.flag === "remove") {
    coverData = await profileAPI.removeCoverPhoto(cover);
  }

  console.log("MUTATION_UPDATING_DATA", profileData, coverData);

  return {
    profileData,
    coverData,
  };
};

const useUpdateProfileCoverPhoto = () => {
  const mutation = useMutation((params: UpdateProfilePhotoParamsType) =>
    updateProfileCoverPhotos(params)
  );
  return mutation;
};

export default useUpdateProfileCoverPhoto;
