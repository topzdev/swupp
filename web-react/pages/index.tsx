import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useQuery } from "react-query";
import postAPI from "../api/post";
import postsAPI from "../api/posts";
import SearchJumbotron from "../components/search/SearchJumbotron";
import AuthLayout from "../layouts/AuthLayout";

const Home: NextPage = () => {
  const { data, error, isLoading, isError } = useQuery("posts", () =>
    postsAPI.getPosts({})
  );

  useEffect(() => {
    async function fetchData() {
      console.log(await postsAPI.getPosts({}));
    }

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error </p>;

  return (
    <AuthLayout>
      <SearchJumbotron />
    </AuthLayout>
  );
};

export default Home;
