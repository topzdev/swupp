import React, { ReactNode } from "react";
import {
  AddressIcon,
  BirthDateIcon,
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  TwitterIcon,
  WebsiteIcon,
} from "../../../../configs/Icons";
import useProfileAbout from "../../../../hooks/profile/useProfileAbout";
import AppLink from "../../../app/AppLink";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface ProfileAboutProps {
  username: string;
}

type AboutLinks = {
  icon: ReactNode;
  text: string | ReactNode;
  label?: string;
}[];

const ProfileAbout: React.FC<ProfileAboutProps> = ({ username }) => {
  const { query } = useRouter();

  let overviewLinks: AboutLinks = [],
    socialLinks: AboutLinks = [];
  const { isLoading, data } = useProfileAbout(username);
  if (isLoading) return <>Loading...</>;

  const links = {
    overview: `/profile/${username}/about`,
    social: `/profile/${username}/about/social`,
  };

  const currentPage = query?.path[1] || "overview";

  console.log(query, currentPage);

  if (data) {
    overviewLinks = [
      {
        icon: <PhoneIcon />,
        text: data.overview.phoneNumber,
        label: "Mobile",
      },
      {
        icon: <EmailIcon />,
        text: data.overview.email,
      },
      {
        icon: <AddressIcon />,
        text: "",
      },
      {
        icon: <BirthDateIcon />,
        text:
          data.overview &&
          dayjs(data.overview.birthdate).format("MMMM DD, YYYY"),
      },
    ];

    socialLinks = [
      {
        icon: <FacebookIcon />,
        text: data.socials.fbUrl,
      },
      {
        icon: <TwitterIcon />,
        text: data.socials.twitterUrl,
      },
      {
        icon: <InstagramIcon />,
        text: data.socials.instaUrl,
      },
      {
        icon: <WebsiteIcon />,
        text: data.socials.instaUrl,
      },
    ];
  }

  overviewLinks = overviewLinks.filter((item) => item.text);
  socialLinks = socialLinks.filter((item) => item.text);

  const renderContent = () => {
    if (currentPage === "overview") {
      return overviewLinks.length ? (
        overviewLinks.map(
          (item, idx) =>
            item.text && (
              <div className="profile-about__content" key={idx}>
                <div className="profile-about__list">
                  <div v-if="item.text" className="profile-about__item">
                    <div className="profile-about__icon">{item.icon}</div>
                    <div className="profile-about__text">
                      <span className="value"> {item.text}</span>

                      <span v-if="item.label" className="label">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <>No Overview Provided</>
      );
    } else if (currentPage === "social") {
      return socialLinks.length ? (
        socialLinks.map(
          (item, idx) =>
            item.text && (
              <div className="profile-about__content" key={idx}>
                <div className="profile-about__list">
                  <div v-if="item.text" className="profile-about__item">
                    <div className="profile-about__icon">{item.icon}</div>
                    <div className="profile-about__text">
                      <span className="value"> {item.text}</span>

                      <span v-if="item.label" className="label">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <>No Social Link Provided</>
      );
    }

    return <>No</>;
  };

  return (
    <div className="container">
      <div className="paper profile-about">
        <div className="row">
          <div className="col-4">
            <div className="profile-about__tabs">
              <div className="tab tab--vertical">
                <div className="tab__header">
                  <h2>About</h2>
                </div>
                <ul className="tab__list">
                  <li className="tab__item">
                    <AppLink
                      shallow
                      href={links.overview}
                      className="tab__link"
                      scroll={false}
                      nav
                      exact
                    >
                      Overview
                    </AppLink>
                  </li>
                  <li className="tab__item">
                    <AppLink
                      shallow
                      href={links.social}
                      className="tab__link"
                      scroll={false}
                      nav
                      exact
                    >
                      Social Media
                    </AppLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
