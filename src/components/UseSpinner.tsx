import React, { Dispatch, SetStateAction, ReactElement } from "react";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
function useSpinner(
  initialState: boolean = false
): [boolean, Dispatch<SetStateAction<boolean>>, ReactElement | null] {
  const [spinner, setSpinner] = React.useState(initialState);
  let fullscreenSpinner = spinner ? (
    <Block
      position="fixed"
      backgroundColor="#FFF000AA"
      width="100%"
      height="100%"
      top="0"
      left="0"
      display={spinner ? "flex" : "none"}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size={96} />
    </Block>
  ) : null;
  // React.useEffect(() => {
  //   fullscreenSpinner = spinner ? (
  //     <Block
  //       position="fixed"
  //       backgroundColor="#FFF000AA"
  //       width="100%"
  //       height="100%"
  //       top="0"
  //       left="0"
  //       display={spinner ? "flex" : "none"}
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <Spinner size={96} />
  //     </Block>
  //   ) : null;
  // }, [setSpinner]);
  return [spinner, setSpinner, fullscreenSpinner];
}
export default useSpinner;
