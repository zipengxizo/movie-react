import React from "react";
export default class Center extends React.Component {
  render() {
    return (
      <div style={{padding:'10px',height:'100%',display:'flex'}}>
        <a
          style={{display:'block',margin:'auto'}}
          href="/admin/users"
          target="_blank"
        >
          进入管理后台
        </a>
      </div>
    );
  }
}
