import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import profileAPI from "../../../api/profile";
import Profile from "../../../components/pages/profile/Profile";
import ProfileAbout from "../../../components/pages/profile/sub-pages/ProfileAbout";
import ProfilePost from "../../../components/pages/profile/sub-pages/ProfilePost";
import DefaultLayout from "../../../layouts/DefaultLayout";

interface ProfilePageProps {}

export const getServerSideProps: GetServerSideProps<{
  username: string;
  pageToLoad: string;
}> = async ({ query }) => {
  const queryClient = new QueryClient();

  const username = query.username
    ? typeof query.username === "string"
      ? query.username
      : query.username[0]
    : "";

  console.log(username, query);

  const pageToLoad =
    query && query.path && query.path.length ? query.path[0] : "post";

  await queryClient.prefetchQuery(`profile-${username}`, () =>
    profileAPI.getProfile(username)
  );

  return {
    props: {
      username,
      pageToLoad,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username, pageToLoad }) => {
  const renderPage = () => {
    switch (pageToLoad) {
      case "post":
        return <ProfilePost username={username} />;
      case "about":
        return <ProfileAbout username={username} />;
    }
  };

  return (
    <DefaultLayout>
      <Profile username={username} />
      {renderPage()}
    </DefaultLayout>
  );
};

export default ProfilePage;
