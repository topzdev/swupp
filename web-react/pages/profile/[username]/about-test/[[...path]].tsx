import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import profileAPI from "../../../../api/profile";
import Profile from "../../../../components/pages/profile/Profile";
import ProfileAbout from "../../../../components/pages/profile/sub-pages/ProfileAbout";
import DefaultLayout from "../../../../layouts/DefaultLayout";

interface ProfilePageProps {}

export const getServerSideProps: GetServerSideProps<{ username: string }> =
  async ({ query }) => {
    const queryClient = new QueryClient();

    const username = query.username
      ? typeof query.username === "string"
        ? query.username
        : query.username[0]
      : "";

    console.log(username);

    await queryClient.prefetchQuery("profile", () =>
      profileAPI.getProfile(username)
    );

    console.log(query);

    return {
      props: {
        username,
        query,
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

const ProfileAboutPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  return (
    <DefaultLayout>
      <Profile username={username} />
      <ProfileAbout username={username} />
    </DefaultLayout>
  );
};

export default ProfileAboutPage;
