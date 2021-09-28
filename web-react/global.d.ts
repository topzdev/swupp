type DataTimestamp = {
  createdAt?: string;
  updatedAt?: string;
};

type DataParanoid = {
  deletedAt?: string;
};

type User = {
  username?: string;
  id?: number;
  email?: string;
  recoveryEmail?: string | null;
  phoneNumber?: string | null;
  isActive?: boolean;
  confirmed?: boolean;
};

type UserProfile = {
  firstname: string;
  lastname: string;
  birthdate?: string | null;
  twitterUrl?: string | null;
  fbUrl?: string | null;
  instaUrl?: string | null;
  websiteUrl?: string | null;
};

type Photo = {
  publicId?: string;
  url?: string;
  securedUrl?: string;
  id?: number;
};

type Trade = {
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

type TradeMessages = {
  text?: string;
  isDeleted?: boolean;
  tradeId: Trade["id"];
  userId: User["id"];
};

type CoverPhoto = Photo;
type ProfilePhoto = Photo;

type PostCount = {
  comment: number;
  views: number;
  likes: number;
  offers: number;
};

type Post = {
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

type PostPhoto = {
  isCover?: boolean;
  caption?: boolean;
} & Photo;

type PostLocation = {
  lat?: number;
  lng?: number;
  name?: string;
} & DataParanoid;

type Colors =
  | "primary"
  | "accent"
  | "warning"
  | "success"
  | "default"
  | "light";

type Size = "small" | "large" | "medium" | "xsmall";

type NewColors =
  | "success"
  | "secondary"
  | "primary"
  | "danger"
  | "warning"
  | "info"
  | "special";
