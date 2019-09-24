import { postsDoc } from "./index";
import firebase from "../firebase";
export const emptyPost: postsDoc = {
  title: "",
  content: "",
  userId: "",
  userName: "",
  userPhotoURL: "",
  commentCount: 0,
  likeCount: 0,
  createdAt: firebase.firestore.Timestamp.now(),
  updatedAt: firebase.firestore.Timestamp.now()
};
