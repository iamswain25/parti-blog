import * as React from "react";
import { FormControl } from "baseui/form-control";
import { RouteComponentProps } from "react-router-dom";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { Input } from "baseui/input";
import { Spinner } from "baseui/spinner";
import { Textarea } from "baseui/textarea";
import { emptyPost, postsDoc } from "../type";
import { auth, firestore } from "../firebase";

export default (props: RouteComponentProps<{ id: string }>) => {
  const docId = props.match.params.id;
  const [form, setForm] = React.useState(emptyPost);
  const [spinner, setSpinner] = React.useState(true);
  React.useEffect(() => {
    firestore
      .collection("posts")
      .doc(docId)
      .get()
      .then(doc => doc.data() as postsDoc)
      .then(setForm)
      .finally(setSpinner.bind(null, false));
  }, [docId]);
  function save() {
    setSpinner(true);
    const { uid, photoURL, displayName } = auth!.currentUser!;
    Object.assign(form, {
      userId: uid,
      userPhotoURL: photoURL,
      userName: displayName,
      updatedAt: new Date()
    });
    firestore
      .collection("posts")
      .doc(docId)
      .update(form)
      .then(() => props.history.push("/"));
  }
  function remove() {
    if (window.confirm("댓글과 함께 모두 삭제됩니다. 삭제하시겠습니까?")) {
      setSpinner(true);
      firestore
        .collection("posts")
        .doc(docId)
        .delete()
        .then(() => props.history.push("/"));
    }
  }
  // if (!auth.currentUser) {
  //   return <Redirect to="/" />;
  // }
  if (spinner) {
    return (
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
    );
  }
  return (
    <>
      <FormControl label="제목">
        <Input
          autoFocus
          value={form.title}
          onChange={event =>
            setForm({ ...form, title: event.currentTarget.value })
          }
        />
      </FormControl>
      <FormControl label="내용">
        <Textarea
          value={form.content}
          onChange={event =>
            setForm({ ...form, content: event.currentTarget.value })
          }
        />
      </FormControl>
      <Button onClick={remove} kind={KIND.secondary}>
        삭제
      </Button>
      <Button onClick={save} kind={KIND.primary}>
        저장
      </Button>
    </>
  );
};
