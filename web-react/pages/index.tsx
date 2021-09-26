import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import postsAPI, { GetPostResponse } from "../api/posts";
import RecentlyAddedPosts from "../components/pages/homepage/RecentlyAddedPosts";
import SearchJumbotron from "../components/search/SearchJumbotron";
import AuthLayout from "../layouts/AuthLayout";

const resultLimit = 10;

export const getServerSideProps: GetServerSideProps<{ data: GetPostResponse }> =
  async () => {
    const response = await postsAPI.getPosts({ page: 1, limit: resultLimit });

    return {
      props: {
        data: response,
      },
    };
  };

function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AuthLayout>
      <SearchJumbotron />

      <div className="container mt-3">
        <RecentlyAddedPosts resultLimit={resultLimit} initialData={data} />
      </div>
    </AuthLayout>
  );
}

export default Home;
