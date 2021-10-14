import { useRouter } from "next/router";
import numeral from "numeral";
import React, { useState } from "react";
import truncate from "truncate";
import { GetPostReturn } from "../../api/posts";
import { HeartIcon, OptionsIcon, ViewsIcon } from "../../configs/Icons";
import { CATEGORIES, CONDITIONS } from "../../constant";
import AppImage from "../app/AppImage";
import AppLink from "../app/AppLink";
import Badge from "../badge/Badge";
import ProfileIcon from "../profile/ProfileIcon";
import ClickOutside from "../utils/ClickOutside";
import PostCardOptionsMenu from "./PostCardOptionsMenu";

interface PostCardProps {
  post: GetPostReturn;
}

interface PostCardHeaderProps {
  post: GetPostReturn;
}

const PostCardHeader: React.FC<PostCardHeaderProps> = ({ post }) => {
  const [showMenu, setShowMenu] = useState(false);
  const profilePhoto = post.user.profile.profilePhoto;
  /* Post Cover Photo Cloudinary Config
	height: 400,
	crop: "scale",
	quality: "auto",
	fetch_format: "auto",
 */
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowMenu((state) => !state);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="card--post__header">
      <AppLink
        className="card--post__user"
        href={`/profile/${post.user.username}`}
      >
        <ProfileIcon
          username={post.user.username}
          name={post.user.username}
          photo={profilePhoto}
        />
      </AppLink>
      <button className="card--post__options" onClick={toggleMenu}>
        <OptionsIcon />
      </button>

      <ClickOutside open={showMenu} setClose={hideMenu}>
        <PostCardOptionsMenu
          id={post.id}
          user={post.user}
        ></PostCardOptionsMenu>
      </ClickOutside>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const truncatedTitle = truncate(post.title ? post.title : "", 64);
  const truncatedPrefered = post.prefered
    ? "Prefered: " + truncate(post.prefered, 30)
    : "";
  const price = `₱ ${numeral(post.price).format("0,0.00")}`;
  const category = CATEGORIES.filter((item) => item.id === post.categoryId)[0]
    .text;
  const condition = CONDITIONS.filter((item) => item.id === post.conditionId)[0]
    .text;

  /* Profile Photo Cloudinary Config
	height: 45,
	quality: "auto",
	crop: "scale",
  */

  const postCoverPhoto = post.coverPhoto.url;

  const view = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/post/${post.id}`);
  };

  return (
    <div className="card--post">
      <div className="card--post__image">
        <AppImage
          src={postCoverPhoto}
          title={post.title}
          draggable={false}
          loading={"lazy"}
          legacy
        />
      </div>
      <PostCardHeader post={post} />
      <AppLink href={`/post/${post.id}`} className="card--post__main">
        <div className="card--post__body">
          {!post.isTraded ? (
            <ul className="card--post__others">
              <li className="card--post__others-item">
                <ViewsIcon />
                <span>{post.counts.views}</span>
              </li>
              <li className="card--post__others-item">
                <HeartIcon />
                <span>{post.counts.likes}</span>
              </li>
            </ul>
          ) : (
            <div className="card--post__traded">
              This post is already traded
            </div>
          )}

          <h3 className="card--post__title" title={post.title}>
            {truncatedTitle}
          </h3>

          <div className="card--post__prefered" title={post.prefered}>
            {truncatedPrefered}
          </div>

          <div className="card--post__description">
            <div className="card--post__price mr-auto">{price}</div>

            <Badge color="primary">{condition}</Badge>
          </div>
        </div>
      </AppLink>
    </div>
  );
};

export default PostCard;
