import React, { Suspense } from "react";
import {  Route, Switch, Redirect } from 'react-router-dom'

import Header from "@/component/header";
import Center from "@/component/center";

export default class Mine extends React.Component {
  render() {
    return (
      <div id="mian">
        <Header title="个人中心" />
        <div id="content">
        <Suspense>
            <Switch>
              <Route path="/mine/center">
                <Center />
              </Route>
              <Route path="/mine/register">
                <div>register</div>
              </Route>
              <Route path="/mine/findPassword">
                <div>findPassword</div>
              </Route>
              <Route path="/">
                <Redirect to="/mine/center" />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  }
}
