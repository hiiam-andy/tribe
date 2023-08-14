import React, { useEffect } from "react";
import SearchButton from "./SearchButton";

import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/SearchButtons.module.css";
import { getTypes } from "../../../store/typesSlice";

export default function SearchButtonsItem() {
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const allTypes = types.list.map((type) => {
    return (
      <SearchButton key={type.id} style={{ margin: "0 6px" }}>
        {type.type_name}
      </SearchButton>
    );
  });
  return <div className={styles.searchButtons_section}>{allTypes}</div>;
}
