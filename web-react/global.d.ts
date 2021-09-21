export type DataTimestamp = {
  createdAt?: string;
  updatedAt?: string;
};

export type DataParanoid = {
  deletedAt?: string;
};

export type User = {
  username?: string;
  id?: number;
  email?: string;
  recoveryEmail?: string | null;
  phoneNumber?: string | null;
  isActive?: boolean;
  confirmed?: boolean;
};

export type UserProfile = {
  firstname: string;
  lastname: string;
  birthdate?: string | null;
  twitterUrl?: string | null;
  fbUrl?: string | null;
  instaUrl?: string | null;
  websiteUrl?: string | null;
};

export type Photo = {
  publicId?: string;
  url?: string;
  securedUrl?: string;
  id?: number;
};

export type Trade = {
  id: number;
  isTraded?: boolean;
  postId?: string;
  offerId?: string;
  offerCreatorId?: string;
  postCreatorId?: string;
  mainPost: Post & {
    photos: PostPhoto;
  };
  offerPost: Post & {
    photos: PostPhoto;
  };
  members: {
    [prop: string]: User & {
      profile: UserProfile & {
        profilePhoto: ProfilePhoto;
      };
    };
  };
};

export type TradeMessages = {
  text?: string;
  isDeleted?: boolean;
  tradeId: Trade["id"];
  userId: User["id"];
};

export type CoverPhoto = Photo;
export type ProfilePhoto = Photo;

export type PostCount = {
  comment: number;
  views: number;
  likes: number;
  offers: number;
};

export type Post = {
  id?: string;
  title?: string;
  body?: string;
  price?: number | string;
  categoryId?: string;
  conditionId?: string;
  prefered?: string;
  isDraft?: boolean;
  views?: number;
  isPriceHidden?: boolean;
  isTraded?: boolean;
} & DataTimestamp &
  DataParanoid;

export type PostPhoto = {
  isCover?: boolean;
  caption?: boolean;
} & Photo;

export type PostLocation = {
  lat?: number;
  lng?: number;
  name?: string;
} & DataParanoid;

export type Colors =
  | "primary"
  | "accent"
  | "warning"
  | "success"
  | "default"
  | "light";
