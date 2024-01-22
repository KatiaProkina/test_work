import React from "react";
import imgFollowers from "../public/followers.png";
import imgFollowing from "../public/following.png";

const UserInfo = ({ data, roundedFormatFollowersNumber }) => (
  <div className="user-information">
    <img src={data.avatar_url} alt="User Avatar" className="avatar-img" />
    <div className="user-name"> {data.name || "N/A"}</div>
    <div className="user-login">{data.login}</div>
    <div className="follow-container">
      <div className="user-followers">
        <img src={imgFollowers} className="followers-img" />
        {roundedFormatFollowersNumber(data.followers)} followers
      </div>
      <div className="user-following">
        <img src={imgFollowing} className="following-img" />
        {data.following} following
      </div>
    </div>
  </div>
);

export default UserInfo;
