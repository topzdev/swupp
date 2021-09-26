import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import postsAPI, {
  GetPostResponse,
  GetPostReturn,
  GetPostsParams,
} from "../api/posts";
import SearchSelect from "../components/search/SearchSelect";
import { LIMIT } from "../constant";
import AuthLayout from "../layouts/AuthLayout";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import PostCard from "../components/post/PostCard";
import AppLoading from "../components/app/AppLoading";

interface SearchProps {}

const limitOptions = [...LIMIT];

const resultLimit = 20;

const parseSearchQuery = ({
  search,
  condition,
  category,
  page,
  limit,
}: GetPostsParams) => {
  let body: any = { limit };
  console.log("parsing:", "limit:", limit, search, page);
  if (search) body.search = search;
  if (condition) body.condition = condition;
  if (category) body.category = category;
  if (page) {
    body.page = page;
  }

  return body;
};

export const getServerSideProps: GetServerSideProps<{ data: GetPostResponse }> =
  async (context) => {
    const response = await postsAPI.getPosts(
      parseSearchQuery({
        page: 1,
        limit: resultLimit,
        ...context.query,
      })
    );

    return {
      props: {
        data: response,
      },
    };
  };

function SearchPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { query } = useRouter();

  const searched = query.search
    ? typeof query.search === "string"
      ? query.search
      : query.search[0]
    : "";

  const condition = query.condition
    ? typeof query.condition === "string"
      ? query.condition
      : query.condition[0]
    : "";

  const category = query.category
    ? typeof query.category === "string"
      ? query.category
      : query.category[0]
    : "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(resultLimit);

  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["searchPosts", page, limit],
    () => {
      return postsAPI.getPosts(
        parseSearchQuery({
          page: page,
          limit,
          search: searched,
          condition: condition,
          category: category,
        })
      );
    },
    {
      keepPreviousData: true,
      initialData: props.data,
    }
  );

  const paginationHandler = (selectedItem: { selected: number }) => {
    return setPage(selectedItem.selected + 1);
  };

  const renderSearchHeading = () => {
    if (!searched) return "Results";

    return (
      <>
        Searched <span className="text--primary">&quot;{searched}&quot;</span>
      </>
    );
  };

  const renderLoading = () => {
    return (
      <div className="row">
        <div className="col-12 d-fle">
          <AppLoading />
        </div>
      </div>
    );
  };

  const pageCount = data && data.count !== 0 ? data.count / limit : 0;

  return (
    <AuthLayout>
      {/* <app-loading v-if="loading" /> */}
      <div className="container mt-3">
        <div className="row mb-2">
          <div className="col-6">
            <h1 className="heading heading--primary">
              {renderSearchHeading()}
            </h1>
          </div>

          <div className="col-auto ml-auto">
            <SearchSelect
              label="Items"
              options={limitOptions.map((item) => ({
                id: item.toString(),
                text: item.toString(),
              }))}
              value={limit.toString()}
              itemText="text"
              itemValue="id"
              onSelected={(value) => setLimit(parseInt(value))}
            />
          </div>
        </div>
        {isLoading ? (
          renderLoading()
        ) : isError ? (
          <p> Something went wrong :( </p>
        ) : (
          <>
            <div className="row">
              {data?.items.length ? (
                data?.items.map((item) => (
                  <div key={item.id} className="col-20 mb-3">
                    <PostCard post={item} />
                  </div>
                ))
              ) : (
                <div className="col-12">No result found</div>
              )}
            </div>
          </>
        )}

        <div className="row" style={{ position: "relative" }}>
          {isFetching ? (
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
              }}
            >
              {renderLoading()}
            </span>
          ) : null}
          <div className="col-12 d-flex align-center">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={paginationHandler}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SearchPage;
