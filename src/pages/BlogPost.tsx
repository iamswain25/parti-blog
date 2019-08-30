import * as React from "react";
import { FormControl } from "baseui/form-control";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import useSpinner from "../components/UseSpinner";
import { Textarea } from "baseui/textarea";
import { auth, firestore } from "../firebase";
import { emptyPost } from "../type";

export default (props: RouteComponentProps) => {
  const [spinnerState, setSpinner, spinner] = useSpinner(false);
  const [form, setForm] = React.useState(emptyPost);
  function save() {
    setSpinner(true);
    const { uid, photoURL, displayName } = auth!.currentUser!;
    Object.assign(form, {
      userId: uid,
      userPhotoURL: photoURL,
      userName: displayName,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    firestore
      .collection("posts")
      .add(form)
      .then(() => props.history.push("/"));
  }
  if (!auth.currentUser) {
    return <Redirect to="/" />;
  }
  if (spinnerState) {
    return spinner;
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
      <Button onClick={save}>저장</Button>
    </>
  );
};
