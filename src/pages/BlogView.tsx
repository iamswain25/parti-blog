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
import { emptyPost } from "../@types/type";
import { postsDoc } from "../@types";

export default (props: RouteComponentProps<{ id: string }>) => {
  const docId = props.match.params.id;
  const [spinnerState, setSpinner, spinner] = useSpinner(true);
  React.useEffect(() => {
    const unsubs = firestore
      .collection("posts")
      .doc(docId)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .onSnapshot(colR =>
        setComment(
          colR.docs.map(d => ({
            _id: d.id,
            ...d.data()
          }))
        )
      );
    Promise.all([
      firestore
        .collection("posts")
        .doc(docId)
        .get()
        .then(doc => doc.data() as postsDoc)
        .then(setForm)
    ]).then(() => setSpinner(false));
    // .finally(() => console.log(form));
    return unsubs;
    // .finally();
  }, [docId, setSpinner]);
  const [form, setForm] = React.useState(emptyPost);
  const [comment, setComment] = React.useState<
    Array<firebase.firestore.DocumentData>
  >([]);
  console.log(form);
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
      <Comments comments={comment} docId={docId} setSpinner={setSpinner} />
      {spinnerState && spinner}
    </>
  );
};
