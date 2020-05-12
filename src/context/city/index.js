import React from 'react'

export const city = {
  cityId: window.localStorage.getItem('nowId') || 1,
  cityName: window.localStorage.getItem('nowNm') ||  "北京",
  tabIndex:0
};


export const CityContext = React.createContext({
  cityId: city.cityId,
  cityName: city.cityName,
  changeCityId: () => {},
  changeTabIndex:()=>{}
});

