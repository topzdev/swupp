import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "../../post/PostCard";
import Loading from "../../progress/Loading";
import { useCallback, useEffect, useState } from "react";
import postsAPI, { GetPostReturn } from "../../../api/posts";
import { useInfiniteQuery, useQuery } from "react-query";

interface RecentlyAddedPostsProps {}

const RecentlyAddedPosts: React.FC<RecentlyAddedPostsProps> = ({}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "posts",
    ({ pageParam }) => {
      console.log(pageParam);
      return postsAPI.getPosts(pageParam ? pageParam : { page, limit });
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return;

        return {
          limit,
          page: page + 1,
        };
      },
    }
  );

  const infiniteHandler = () => {
    fetchNextPage();
    setPage((state) => state + 1);
  };

  return (
    <>
      <div className="row my-2">
        <div className="col-12">
          <h1 className="heading heading--primary">Recently Added</h1>
        </div>
      </div>
      {data && (
        <InfiniteScroll
          style={{ overflowX: "hidden" }}
          dataLength={data.pages.length} //This is important field to render the next data
          next={infiniteHandler}
          hasMore={!!hasNextPage}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row">
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.items.map((item) => (
                  <div className="col-20 mb-3" key={item.id}>
                    <PostCard post={item}></PostCard>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default RecentlyAddedPosts;
