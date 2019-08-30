import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default (props: { comments: any[] }) => {
  console.log(props.comments);
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        댓글
      </Header>

      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Matt</Comment.Author>
          <Comment.Metadata>Today at 5:42PM</Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
        </Comment.Content>
      </Comment>

      <Form reply>
        <Form.TextArea />
        <Button content="댓글 달기" labelPosition="right" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
};
