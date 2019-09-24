import firebase from "../firebase";
export interface postsDoc {
  title: string;
  content: string;
  userId: string;
  userName: string;
  userPhotoURL: string;
  commentCount: number;
  likeCount: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
