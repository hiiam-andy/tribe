import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../store/eventSlice";

export default function PageEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { event } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getEvent(String(id)));
  }, [dispatch]);
  console.log(event);

  return (
    <div>
      <button onClick={() => navigate(-1)}>назад</button>
      <h1>Страница с номером {id}</h1>
    </div>
  );
}
