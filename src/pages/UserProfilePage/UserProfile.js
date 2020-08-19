import React, { useEffect } from "react";
import ProfileTemplate from "../../components/ProfileTemplate/ProfileTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserForProfile } from "../../store/user/actions";
import { selectUserLookingAt, selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";

export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserForProfile(id));
  }, []);
  const user = useSelector(selectUser);
  const currentUser = useSelector(selectUserLookingAt);

  return currentUser ? (
    <ProfileTemplate
      title={currentUser.title}
      name={currentUser.name}
      accountType={currentUser.accountType}
      description={currentUser.description}
      imageUrl={currentUser.imageUrl}
    />
  ) : user.accountType === "guest" ? (
    <h1>Log in to see other people's profiles</h1>
  ) : (
    <Loading></Loading>
  );
}
