import React from "react";

import Event from "./Event";
import { useSelector } from "react-redux";
import PageAuth from "../Auth/PageAuth";

export default function PageEvent() {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{isAuth ? <Event /> : <PageAuth />}</>;
}
