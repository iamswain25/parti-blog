import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import firebase, { auth, firestore } from "../firebase";
// import useSpinner from "../components/UseSpinner";

export default (props: {
  comments: any[];
  docId: string;
  setSpinner: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const inputRef = React.useRef();
  const [comm, setComm] = React.useState("");
  const [commEdit, setCommEdit] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  function putComment() {
    const user = auth.currentUser;
    // props.setSpinner(true);
    Promise.all([
      firestore
        .doc(`posts/${props.docId}`)
        .collection("comments")
        .add({
          content: comm,
          createdAt: firebase.firestore.Timestamp.now(),
          updatedAt: firebase.firestore.Timestamp.now(),
          userId: user!.uid,
          userName: user!.displayName,
          userPhotoURL: user!.photoURL
        }),
      firestore
        .collection("posts")
        .doc(props.docId)
        .update({ commentCount: firebase.firestore.FieldValue.increment(1) })
    ]);
    // .then(() => props.setSpinner(false));
    setComm("");
  }
  function editComment() {
    const user = auth.currentUser;
    // props.setSpinner(true);
    firestore.doc(`posts/${props.docId}/comments/${edit}`).update({
      content: commEdit,
      updatedAt: firebase.firestore.Timestamp.now(),
      userName: user!.displayName,
      userPhotoURL: user!.photoURL
    });
    // .then(() => props.setSpinner(false));
    setCommEdit("");
    setEdit(false);
  }
  return (
    <Comment.Group size="large">
      <Header as="h3" dividing>
        댓글
      </Header>
      {props.comments.map((c, id) => (
        <Comment key={id}>
          <Comment.Avatar src={c.userPhotoURL} />
          <Comment.Content>
            <Comment.Author as="span">{c.userName}</Comment.Author>
            <Comment.Metadata>
              {c.updatedAt.toDate().toLocaleString("ko")}
            </Comment.Metadata>
            {auth.currentUser &&
              c.userId === auth.currentUser!.uid &&
              edit === false && (
                <Button
                  onClick={event => {
                    setEdit(c._id);
                    setCommEdit(c.content);
                    // inputRef.current!.focus();
                  }}
                  content="수정"
                  floated="right"
                />
              )}
            {edit === c._id ? (
              <Form>
                <Form.Input
                  action={{ content: "수정", onClick: editComment }}
                  value={commEdit}
                  onChange={(event, data) => setCommEdit(data.value)}
                  // ref={inputRef}
                />
              </Form>
            ) : (
              <Comment.Text>{c.content}</Comment.Text>
            )}
          </Comment.Content>
        </Comment>
      ))}
      {auth.currentUser && (
        <Form reply>
          <Form.Input
            label="댓글 달기"
            action={{
              // content: "저장",
              // iconPosition: "right",
              icon: "edit",
              primary: true,
              onClick: putComment
            }}
            value={comm}
            onChange={(event, data) => setComm(data.value as string)}
          />
        </Form>
      )}
    </Comment.Group>
  );
};
