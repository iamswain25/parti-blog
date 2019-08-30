import firebase from "../firebase";
export interface postsDoc {
  title: string;
  content: string;
  userId: string;
  userName: string;
  userPhotoURL: string;
  commentCount: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

export const emptyPost: postsDoc = {
  title: "",
  content: "",
  userId: "",
  userName: "",
  userPhotoURL: "",
  commentCount: 0,
  createdAt: new firebase.firestore.Timestamp(),
  updatedAt: new firebase.firestore.Timestamp()
};
