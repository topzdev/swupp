import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect } from "react";
import { dehydrate, QueryCache, QueryClient } from "react-query";
import authAPI from "../../../api/auth";
import profileAPI from "../../../api/profile";
import Profile from "../../../components/pages/profile/Profile";
import { useProfileContext } from "../../../context/ProfileContext";
import useProfile from "../../../hooks/profile/useProfile";
import DefaultLayout from "../../../layouts/DefaultLayout";

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

    return {
      props: {
        username,
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

const ProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const { response } = useProfile(username);

  if (response.isLoading) return <>Loading...</>;
  if (response.isError) return <>Something went wrong</>;

  return (
    <DefaultLayout>
      <Profile profile={response.data} />
    </DefaultLayout>
  );
};

export default ProfilePage;
