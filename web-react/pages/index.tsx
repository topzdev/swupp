import type { NextPage } from "next";
import RecentlyAddedPosts from "../components/pages/homepage/RecentlyAddedPosts";
import SearchJumbotron from "../components/search/SearchJumbotron";
import AuthLayout from "../layouts/AuthLayout";

const Home: NextPage = () => {
  return (
    <AuthLayout>
      <SearchJumbotron />

      <div className="container mt-3">
        <RecentlyAddedPosts />
      </div>

      {/* <button
        onClick={() => infiniteHandler()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
    </AuthLayout>
  );
};

export default Home;
