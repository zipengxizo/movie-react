import React from "react";

export function Loading(props) {
  if (props.isLoading) {
    return <div className="loader"></div>;
  }
  return null;
}
