import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import styles from "./styles/SearchButtons.module.css";
import { getTypes, setSelectedType } from "../../../store/typesSlice";
import SearchButton from "./SearchButton";

export default function SearchButtonsItem() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const { types } = useSelector((state) => state);
  const [selectedTypesFromComponent, setSelectedTypesFromComponent] = useState(
    []
  );

  const addToArray = (type_name) => {
    if (!selectedTypesFromComponent.includes(type_name)) {
      setSelectedTypesFromComponent([...selectedTypesFromComponent, type_name]);
      dispatch(setSelectedType(selectedTypesFromComponent));
    } else {
      setSelectedTypesFromComponent(
        selectedTypesFromComponent.filter((el) => el !== type_name)
      );
      dispatch(setSelectedType(selectedTypesFromComponent));
    }
  };
  const setToState = (selectedTypesFromComponent) => {
    dispatch(setSelectedType(selectedTypesFromComponent));
  };

  const allTypes = types.list.map(({ id, type_name }) => {
    return (
      <SearchButton
        key={id}
        onClick={() => {
          addToArray(type_name);
          setToState(selectedTypesFromComponent);
        }}
        active={
          selectedTypesFromComponent.includes(type_name)
            ? `${styles.active}`
            : ""
        }
      >
        {type_name}
      </SearchButton>
    );
  });
  return <div className={styles.searchButtons_section}>{allTypes}</div>;
}
