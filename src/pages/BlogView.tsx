import * as React from "react";
import { Avatar } from "baseui/avatar";
import { RouteComponentProps, Link } from "react-router-dom";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import firebase, { auth, firestore } from "../firebase";
import Comments from "../components/Comments";
import { Heading, HeadingLevel } from "baseui/heading";
import { Paragraph1 } from "baseui/typography";
import useSpinner from "../components/UseSpinner";

export default (props: RouteComponentProps<{ id: string }>) => {
  const docId = props.match.params.id;
  const [spinnerState, setSpinner, spinner] = useSpinner(true);
  React.useEffect(() => {
    firestore
      .collection("posts")
      .doc(docId)
      .get()
      .then(doc => doc.data() || {})
      .then(setForm)
      .finally(setSpinner.bind(null, false));
    firestore
      .collection("posts")
      .doc(docId)
      .collection("comments")
      .get()
      .then(colR =>
        colR.docs.map(d => ({
          _id: d.id,
          ...d.data()
        }))
      )
      .then(setComment);
  }, [docId, setSpinner]);
  const [form, setForm] = React.useState<firebase.firestore.DocumentData>({});
  const [comment, setComment] = React.useState<
    Array<firebase.firestore.DocumentData>
  >([]);
  if (spinnerState) {
    return spinner;
  }
  return (
    <>
      <HeadingLevel>
        <Block alignItems="center" display="flex">
          <Avatar
            name={form.userName}
            size={"scale1000"}
            src={form.userPhotoURL}
          />
          <span style={{ marginLeft: 10 }}>{form.userName}</span>
        </Block>
        {form.createdAt.toDate().toLocaleString("ko")}
        <Heading>{form.title}</Heading>
        <Paragraph1>{form.content}</Paragraph1>
      </HeadingLevel>
      {auth!.currentUser && auth!.currentUser!.uid === form.userId && (
        <Link to={`/edit/${docId}`}>
          <Button>수정</Button>
        </Link>
      )}
      <Comments comments={comment} />
    </>
  );
};
