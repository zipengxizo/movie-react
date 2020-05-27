import React from "react";

export function Loading(props) {
  const position = props.position;
  if (props.isLoading) {
    return (
      <div className={`loadEffect load-fix ${position ? "load-relative" : ""}`}>
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
