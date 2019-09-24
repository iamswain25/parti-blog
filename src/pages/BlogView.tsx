import React, { useCallback } from "react";
import { Avatar } from "baseui/avatar";
import { RouteComponentProps, Link } from "react-router-dom";
import { Button, SHAPE } from "baseui/button";
import { Block } from "baseui/block";
import firebase, { auth, firestore } from "../firebase";
import Comments from "../components/Comments";
import { Heading, HeadingLevel } from "baseui/heading";
import { Paragraph1 } from "baseui/typography";
import useSpinner from "../components/UseSpinner";
import { emptyPost } from "../@types/type";
import { Icon } from 'semantic-ui-react'
import { postsDoc } from "../@types";

export default (props: RouteComponentProps<{ id: string }>) => {
  const docId = props.match.params.id;
  const [spinnerState, setSpinner, spinner] = useSpinner(true);
  const asyncFunc = useCallback(async (docId: string) => {
    const likedUser = await firestore
      .collection("posts")
      .doc(docId).collection("likedUser").doc(auth!.currentUser!.uid).get();
    if (!likedUser.exists) {
      console.log(docId);
      firestore
        .collection("posts")
        .doc(docId).update({ likeCount: firebase.firestore.FieldValue.increment(1) });
      firestore
        .collection("posts")
        .doc(docId).collection("likedUser").doc(auth!.currentUser!.uid).set({ createdAt: new Date() });
    } else {
      alert("이미 공감하셨습니다.");
      firestore
        .collection("posts")
        .doc(docId).update({ likeCount: firebase.firestore.FieldValue.increment(-1) });
    }
  }, []);
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
        .onSnapshot(doc => setForm(doc.data() as postsDoc))
    ]).then(() => setSpinner(false));
    return unsubs;
  }, [docId, setSpinner, asyncFunc]);
  const [form, setForm] = React.useState(emptyPost);
  const [comment, setComment] = React.useState<Array<firebase.firestore.DocumentData>>([]);
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
        <Paragraph1><Button shape={SHAPE.round} onClick={() => asyncFunc(docId)}><Icon name='heart outline' /></Button>{form.likeCount || 0}</Paragraph1>

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
