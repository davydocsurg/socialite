import React from "react";

function SidebarOption({ text, Icon }) {
  return (
    <div className={`sidebarOption `}>
      <Icon className="" />
      <h2 className="pl-5 m-0 d-none d-lg-block">{text}</h2>
    </div>
  );
}

export default SidebarOption;
// ${active && "sidebarOption--active"}
