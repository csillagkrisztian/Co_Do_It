import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import ProfileTemplate from "../../components/ProfileTemplate/ProfileTemplate";

export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const title = `Welcome ${user.name}, do you want to change something?`;
  const [imageUrl, setImageUrl] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  useEffect(() => {
    setAboutMe(user.description);
    setImageUrl(user.imageUrl);
  }, [user]);

  return (
    <ProfileTemplate
      title={title}
      name={user.name}
      accountType={user.accountType}
      description={user.description}
      setAboutMe={setAboutMe}
      aboutMe={aboutMe}
      setImageUrl={setImageUrl}
      imageUrl={user.imageUrl}
      imageUrlState={imageUrl}
    />
  );
}
