import React from "react";
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
        <NavigationItem>Parti Blog</NavigationItem>
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
