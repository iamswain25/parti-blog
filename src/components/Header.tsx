import React from "react";
import { Link } from "react-router-dom";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList
} from "baseui/header-navigation";

import LoginUI from "../components/loginUI";

export default () => {
  return (
    <HeaderNavigation>
      <NavigationList $align={ALIGN.left}>
        <NavigationItem>
          <Link to="/">
            <h1>Parti Blog</h1>
          </Link>
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      {/* <NavigationList $align={ALIGN.right}>
      <NavigationItem>
        <Link href="#basic-link1">Tab Link One</Link>
      </NavigationItem>
      <NavigationItem>
        <Link href="#basic-link2">Tab Link Two</Link>
      </NavigationItem>
    </NavigationList> */}
      <NavigationList $align={ALIGN.right}>
        <LoginUI />
      </NavigationList>
    </HeaderNavigation>
  );
};
