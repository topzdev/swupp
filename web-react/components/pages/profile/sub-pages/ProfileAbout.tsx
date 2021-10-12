import React from "react";

interface ProfileAboutProps {
  username: string;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ username }) => {
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
                    {/* <nuxt-link :to="links.about" exact className="tab__link">
                    Overview
                  </nuxt-link> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="items" className="col-8">
            <div className="profile-about__content">
              <div className="profile-about__list">
                {/* <template v-for="(item, idx) in items">
                <div v-if="item.text" :key="idx" className="profile-about__item">
                  <div className="profile-about__icon">
                    <app-icon :path="item.icon" type="mdi" />
                  </div>
                  <div className="profile-about__text">
                    <span className="value"> {{ item.text }}</span>

                    <span v-if="item.label" className="label">{{
                      item.label
                    }}</span>
                  </div>

                 
                </div>
              </template> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
