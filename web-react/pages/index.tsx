import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SearchJumbotron from "../components/search/SearchJumbotron";
import AuthLayout from "../layouts/AuthLayout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <AuthLayout>
      <SearchJumbotron />
    </AuthLayout>
  );
};

export default Home;
