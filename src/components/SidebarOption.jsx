import React from "react";

function SidebarOption({ active, text, Icon }) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon className="" />
      <h2 className="pl-5 m-0">{text}</h2>
    </div>
  );
}

export default SidebarOption;
