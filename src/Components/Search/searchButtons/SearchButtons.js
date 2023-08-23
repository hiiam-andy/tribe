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

  const addToArray = (e) => {
    if (
      e.target.checked &&
      !selectedTypesFromComponent.includes(e.target.name)
    ) {
      setSelectedTypesFromComponent([
        ...selectedTypesFromComponent,
        e.target.name,
      ]);
      dispatch(setSelectedType(selectedTypesFromComponent));
    } else {
      setSelectedTypesFromComponent(
        selectedTypesFromComponent.filter((el) => el !== e.target.name)
      );
      dispatch(setSelectedType(selectedTypesFromComponent));
    }
  };

  const allTypes = types.list.map(({ id, type_name }) => {
    return (
      <SearchButton
        key={id}
        name={type_name}
        onClick={(e) => {
          addToArray(e);
        }}
        readOnly={true}
        checked={types.selectedType.includes(type_name)}
      />
    );
  });
  return <div className={styles.searchButtons_section}>{allTypes}</div>;
}
