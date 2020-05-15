import React from "react";

export function Loading(props) {
  if (props.isLoading) {
    return (
      <div className="loadEffect">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
  return null;
}
