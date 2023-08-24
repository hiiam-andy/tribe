import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  const profile = user.userPage;

  return <div></div>;
}
