import * as React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "baseui/avatar";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { StyledNavigationItem as NavigationItem } from "baseui/header-navigation";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from "baseui/modal";
import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import firebase, { auth, uiConfig } from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [disabled, setDisabled] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(_user => {
      if (_user) {
        setUser(_user);
        console.log(_user);
      } else {
        setUser(null);
      }
      setIsOpen(false);
    });
    return unsubscribe;
  }, []);
  function logout() {
    auth.signOut();
  }
  function modalCloseHandler() {
    setIsOpen(false);
    setDisabled(true);
  }
  if (!user) {
    return (
      <NavigationItem>
        <Button onClick={() => setIsOpen(true)}>로그인</Button>
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <ModalHeader>로그인 방법</ModalHeader>
          <ModalBody>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </ModalBody>
          {/* <ModalFooter>
        <ModalButton onClick={props.close}>Cancel</ModalButton>
      </ModalFooter> */}
        </Modal>
      </NavigationItem>
    );
  } else {
    return (
      <>
        <NavigationItem>
          <Link to="post">
            <Button>글 쓰기</Button>
          </Link>
        </NavigationItem>
        <NavigationItem>
          <ButtonGroup>
            <Button onClick={() => setIsOpen(true)}>
              <Avatar
                name="user"
                size={"scale1200"}
                src={user.photoURL || ""}
              />
              <Block paddingLeft={"10px"}>{user.displayName}</Block>
            </Button>
          </ButtonGroup>
        </NavigationItem>
        <NavigationItem>
          <Button onClick={logout}>로그아웃</Button>
        </NavigationItem>
        <Modal onClose={modalCloseHandler} isOpen={isOpen}>
          <ModalHeader>내 정보</ModalHeader>
          <ModalBody>
            <FormControl label="계정명">
              <Input
                value={user.displayName || ""}
                disabled={disabled}
                onChange={event =>
                  setUser({ ...user, displayName: event.currentTarget.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ModalButton
              onClick={() =>
                auth!
                  .currentUser!.delete()
                  .catch(({ message }) => alert(message))
              }
            >
              계정삭제
            </ModalButton>
            <ModalButton onClick={modalCloseHandler}>취소</ModalButton>
            {disabled ? (
              <ModalButton onClick={() => setDisabled(false)}>수정</ModalButton>
            ) : (
              <ModalButton
                onClick={async () =>
                  auth!
                    .currentUser!.updateProfile({
                      displayName: user.displayName
                    })
                    .then(() => alert("변경되었습니다."))
                    .then(() => setDisabled(true))
                    .then(() => setIsOpen(false))
                    .catch(alert)
                }
              >
                변경
              </ModalButton>
            )}
          </ModalFooter>
        </Modal>
      </>
    );
  }
};
