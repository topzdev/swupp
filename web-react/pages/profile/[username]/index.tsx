import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Profile from "../../../components/pages/profile/Profile";
import DefaultLayout from "../../../layouts/DefaultLayout";

interface ProfilePageProps {}

export const getServerSideProps: GetServerSideProps<{ username: string }> =
  async ({ query }) => {
    const username = query.username
      ? typeof query.username === "string"
        ? query.username
        : query.username[0]
      : "";

    return {
      props: {
        username,
      },
    };
  };

const ProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  return (
    <DefaultLayout>
      <Profile username={username} />
    </DefaultLayout>
  );
};

export default ProfilePage;
