import React from "react";
import { useParams } from "react-router-dom";

function DetailHub() {
  let { id } = useParams();
  return <div>DetailHub - {id}</div>;
}

export default DetailHub;
