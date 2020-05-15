import React, { useContext } from "react";

import "./index.css";
import { Loading } from "../loading";
import { CityContext } from "../../context/city";
import api from "../../api";
import { useHistory } from "react-router-dom";
// import Scroller from "../scroller/index";
class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cityList: [],
      hotList: [],
    };
    this.citySortRef = React.createRef();
    this.handleToIndex = this.handleToIndex.bind(this);
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }
  componentDidUpdate() {
    this.generateScrollTop();
  }

  handleToIndex(index) {
    console.log(index);
    let offsetTop = this.offsetTopArr[index];
    this.citySortRef.current.parentNode.style.transform =
      "translateY(" + -offsetTop + "px)";
  }

  generateScrollTop() {
    let h2 = this.citySortRef.current.getElementsByTagName("h2");
    this.offsetTopArr = Array.from(h2).map((item) => {
      return item.offsetTop;
    });
  }

  componentDidCache = () => {
    console.log("List cached");
  };

  componentDidRecover = () => {
    this.context.changeTabIndex(-1);
  };

  componentDidMount() {
    this.context.changeTabIndex(-1);
    api.city
      .cityList()
      .then((res) => {
        const { msg, data } = res.data;
        if (msg === "ok") {
          let { cityList, hotList } = this.formatCityList(data.cities);
          this.setState({
            isLoading: false,
            cityList: cityList,
            hotList: hotList,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  formatCityList(cities) {
    var cityList = [];
    var hotList = [];
    hotList = cities.filter((item) => {
      return item.isHot === 1;
    });

    for (var i = 0; i < cities.length; i++) {
      var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
      if (toCom(firstLetter)) {
        //新添加index
        cityList.push({
          index: firstLetter,
          list: [{ nm: cities[i].nm, id: cities[i].id }],
        });
      } else {
        //累加到已有index中
        for (var j = 0; j < cityList.length; j++) {
          if (cityList[j].index === firstLetter) {
            cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
          }
        }
      }
    }

    cityList.sort((n1, n2) => {
      if (n1.index > n2.index) {
        return 1;
      } else if (n1.index < n2.index) {
        return -1;
      } else {
        return 0;
      }
    });

    function toCom(firstLetter) {
      return !cityList.some((item) => {
        return item.index === firstLetter;
      });
    }

    return {
      cityList,
      hotList,
    };
  }
  render() {
    return (
      <div className="city_body">
        <Loading isLoading={this.state.isLoading} />
        <div className="city_list">
          {/* <Scroller> */}
            <div className="city_hot">
              <h2>热门城市</h2>
              <ul className="clearfix">
                <HotCities hotCities={this.state.hotList} />
              </ul>
            </div>
            <div className="city_sort" ref={this.citySortRef}>
              <CitiesItem citiesList={this.state.cityList} />
            </div>
          {/* </Scroller> */}
        </div>
        <div className="city_index">
          <ul>
            <CitiesIndex
              citiesIndex={this.state.cityList}
              handleToIndex={this.handleToIndex}
            />
          </ul>
        </div>
      </div>
    );
  }
}

City.contextType = CityContext;
export default City;

/* export default  function Context(){
  return (
    <CityContext.Consumer>
      {city=>(
        <TabContext.Consumer>
          {tab=>(
            <City city={city} tab={tab} />
          )}
        </TabContext.Consumer>
      )}
    </CityContext.Consumer>
  )
} */

function HotCities(props) {
  let history = useHistory();
  const cityContext = useContext(CityContext);
  const { hotCities } = props;
  function handleToCity(cityName, cityId) {
    cityContext.changeCityId(cityId, cityName);
    cityContext.changeTabIndex(0);
    window.localStorage.setItem("nowNm", cityName);
    window.localStorage.setItem("nowId", cityId);
    history.push("nowPlaying");
  }
  return hotCities.map((item, index) => {
    return (
      <li
        key={index}
        onClick={() => {
          handleToCity(item.nm, item.id);
        }}
      >
        {item.nm}
      </li>
    );
  });
}

function CitiesItem(props) {
  let history = useHistory();
  const cityContext = useContext(CityContext);
  const { citiesList } = props;
  function handleToCity(cityName, cityId) {
    cityContext.changeCityId(cityId, cityName);
    cityContext.changeTabIndex(0);
    window.localStorage.setItem("nowNm", cityName);
    window.localStorage.setItem("nowId", cityId);
    history.push("nowPlaying");
  }
  return citiesList.map((item, index) => {
    return (
      <div key={index}>
        <h2>{item.index}</h2>
        <ul>
          {item.list.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleToCity(item.nm, item.id);
                }}
              >
                {item.nm}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
}

function CitiesIndex(props) {
  const { citiesIndex } = props;
  return citiesIndex.map((item, index) => {
    return (
      <li key={index} onClick={(e) => props.handleToIndex(index, e)}>
        {item.index}
      </li>
    );
  });
}
