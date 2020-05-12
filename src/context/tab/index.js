import React from "react";

export const tab = {
  tabIndex: 0,
};
export const TabContext = React.createContext({
  tabIndex: tab.tabIndex,
  changeTabIndex:()=>{}
});
