import { types } from "./types";
import offer from "../services/posts";

export const state = () => ({
  recentChats: [
    {
      id: 1,
      isTraded: false,
      createdAt: "2021-06-03T11:36:50.757Z",
      updatedAt: "2021-06-03T11:36:50.757Z",
      postId: 1,
      offerId: 2,
      offerCreatorId: 3,
      postCreatorId: 2,
      offerCreator: {
        username: "swupdev@123",
        id: 3,
        profile: {
          firstname: "dtsgorwkjv",
          lastname: "Lugod"
        }
      },
      mainPost: {
        title: "Honda ADV 150 swap to your NMAX2020",
        id: 1,
        photos: [
          {
            id: 2,
            url:
              "http://res.cloudinary.com/topzdev/image/upload/v1620119316/swupp-dev/posts/ckitznrhgu6cb1d0krs0.jpg",
            securedUrl:
              "https://res.cloudinary.com/topzdev/image/upload/v1620119316/swupp-dev/posts/ckitznrhgu6cb1d0krs0.jpg",
            caption: "",
            isCover: true,
            publicId: "swupp-dev/posts/ckitznrhgu6cb1d0krs0",
            postId: 1
          }
        ]
      },
      offerPost: {
        title: "Swapping my Iphone X to Honda ADV, add cash ",
        id: 2,
        photos: [
          {
            id: 4,
            url:
              "http://res.cloudinary.com/topzdev/image/upload/v1622716212/swupp-dev/posts/dfnzcxmkkkafpcxrrccz.jpg",
            securedUrl:
              "https://res.cloudinary.com/topzdev/image/upload/v1622716212/swupp-dev/posts/dfnzcxmkkkafpcxrrccz.jpg",
            caption: "",
            isCover: true,
            publicId: "swupp-dev/posts/dfnzcxmkkkafpcxrrccz",
            postId: 2
          }
        ]
      },
      tradeMessages: [
        {
          id: 3,
          text: "Test message 1",
          isDeleted: false,
          createdAt: "2021-06-03T12:49:14.984Z",
          updatedAt: "2021-06-03T12:49:14.984Z",
          tradeId: 1,
          userId: 1,
          user: {
            username: "dtsgorwkjv",
            id: 1,
            profile: {
              firstname: "dtsgorwkjv",
              lastname: "Lugod"
            }
          }
        }
      ]
    }
  ],
  current: {
    header: {
      id: 1,
      isTraded: false,
      createdAt: "2021-06-03T11:36:50.757Z",
      updatedAt: "2021-06-03T11:36:50.757Z",
      postId: 1,
      offerId: 2,
      offerCreatorId: 3,
      postCreatorId: 2,
      offerCreator: {
        username: "swupdev@123",
        id: 3,
        profile: {
          firstname: "dtsgorwkjv",
          lastname: "Lugod"
        }
      },
      mainPost: {
        title: "Honda ADV 150 swap to your NMAX2020",
        id: 1,
        photos: [
          {
            id: 2,
            url:
              "http://res.cloudinary.com/topzdev/image/upload/v1620119316/swupp-dev/posts/ckitznrhgu6cb1d0krs0.jpg",
            securedUrl:
              "https://res.cloudinary.com/topzdev/image/upload/v1620119316/swupp-dev/posts/ckitznrhgu6cb1d0krs0.jpg",
            caption: "",
            isCover: true,
            publicId: "swupp-dev/posts/ckitznrhgu6cb1d0krs0",
            postId: 1
          }
        ]
      },
      offerPost: {
        title: "Swapping my Iphone X to Honda ADV, add cash ",
        id: 2,
        photos: [
          {
            id: 4,
            url:
              "http://res.cloudinary.com/topzdev/image/upload/v1622716212/swupp-dev/posts/dfnzcxmkkkafpcxrrccz.jpg",
            securedUrl:
              "https://res.cloudinary.com/topzdev/image/upload/v1622716212/swupp-dev/posts/dfnzcxmkkkafpcxrrccz.jpg",
            caption: "",
            isCover: true,
            publicId: "swupp-dev/posts/dfnzcxmkkkafpcxrrccz",
            postId: 2
          }
        ]
      }
    },
    messages: [
      {
        id: 4,
        text: "Hello World, this is meeee!!",
        isDeleted: false,
        createdAt: "2021-06-04T17:11:34.053Z",
        updatedAt: "2021-06-04T17:11:34.053Z",
        tradeId: 1,
        userId: 3,
        user: {
          username: "swupdev@123",
          id: 3,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 3
            }
          }
        }
      },
      {
        id: 3,
        text: "Test message 1",
        isDeleted: false,
        createdAt: "2021-06-03T12:49:14.984Z",
        updatedAt: "2021-06-03T12:49:14.984Z",
        tradeId: 1,
        userId: 1,
        user: {
          username: "dtsgorwkjv",
          id: 1,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 1
            }
          }
        }
      },
      {
        id: 2,
        text: "Hello,World",
        isDeleted: false,
        createdAt: "2021-06-03T12:40:56.010Z",
        updatedAt: "2021-06-03T12:40:56.010Z",
        tradeId: 1,
        userId: 1,
        user: {
          username: "dtsgorwkjv",
          id: 1,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 1
            }
          }
        }
      },
      {
        id: 1,
        text: "Hello,World",
        isDeleted: false,
        createdAt: "2021-06-03T11:36:50.768Z",
        updatedAt: "2021-06-03T11:36:50.768Z",
        tradeId: 1,
        userId: 1,
        user: {
          username: "dtsgorwkjv",
          id: 1,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 1
            }
          }
        }
      },
      {
        id: 4,
        text: "Hello,World",
        isDeleted: false,
        createdAt: "2021-06-03T11:36:50.768Z",
        updatedAt: "2021-06-03T11:36:50.768Z",
        tradeId: 1,
        userId: 1,
        user: {
          username: "dtsgorwkjv",
          id: 1,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 1
            }
          }
        }
      },
      {
        id: 5,
        text: "Hello,World",
        isDeleted: false,
        createdAt: "2021-06-03T11:36:50.768Z",
        updatedAt: "2021-06-03T11:36:50.768Z",
        tradeId: 1,
        userId: 1,
        user: {
          username: "dtsgorwkjv",
          id: 1,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 1
            }
          }
        }
      },
      {
        id: 6,
        text: "Hello,World",
        isDeleted: false,
        createdAt: "2021-06-03T11:36:50.768Z",
        updatedAt: "2021-06-03T11:36:50.768Z",
        tradeId: 1,
        userId: 1,
        user: {
          username: "dtsgorwkjv",
          id: 1,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 1
            }
          }
        }
      },
      {
        id: 7,
        text: "Hello World, this is meeee!!",
        isDeleted: false,
        createdAt: "2021-06-04T17:11:34.053Z",
        updatedAt: "2021-06-04T17:11:34.053Z",
        tradeId: 1,
        userId: 3,
        user: {
          username: "swupdev@123",
          id: 3,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 3
            }
          }
        }
      },
      {
        id: 8,
        text: "Hello World, this is meeee!!",
        isDeleted: false,
        createdAt: "2021-06-04T17:11:34.053Z",
        updatedAt: "2021-06-04T17:11:34.053Z",
        tradeId: 1,
        userId: 3,
        user: {
          username: "swupdev@123",
          id: 3,
          profile: {
            firstname: "dtsgorwkjv",
            lastname: "Lugod",
            profilePhoto: {
              publicId: null,
              url: null,
              securedUrl: null,
              id: 3
            }
          }
        }
      }
    ]
  }
});

export const mutations = {
  [types.mutations.SET_HOME_POSTS](state, posts) {
    state.homepage = {
      ...posts,
      items: [...state.homepage.items, ...posts.items]
    };
  }
};

export const actions = {
  async [types.actions.FETCH_HOME_POSTS](
    { commit, state, dispatch, getters, rootState },
    query
  ) {
    try {
      console.log("Query ", query);
      const data = await postsServices.getPosts({
        ...query,
        order: "DESC"
      });
      console.log("Fetching post", data);
      commit(types.mutations.SET_HOME_POSTS, data);
    } catch (error) {
      console.error(error);
    }
  }
};
