import firebase from "../firebase";
export interface postsDoc {
  title: string;
  content: string;
  userId: string;
  userName: string;
  userPhotoURL: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
