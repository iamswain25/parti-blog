import * as React from "react";
import { Link } from "react-router-dom";
import useSpinner from "../components/UseSpinner";
import { firestore } from "../firebase";
export default () => {
  const [spinnerState, setSpinner, spinner] = useSpinner(true);
  const [cards, setCards] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    firestore
      .collection("posts")
      .orderBy("createdAt")
      .get()
      .then(ref => ref.docs.map(doc => ({ _id: doc.id, ...doc.data() })))
      .then(arr => setCards(arr))
      .finally(setSpinner.bind(null, false));
  }, [setSpinner]);
  if (spinnerState) {
    return spinner;
  }
  return (
    <>
      {cards.map(c => (
        <ul key={c._id}>
          <li>
            <Link to={`post/${c._id}`}>{c.title}</Link>
            {c.commentCount ? ` (${c.commentCount}개의 댓글)` : ""}
            <i style={{ marginLeft: 10 }}>
              -{c.createdAt.toDate().toLocaleString("ko")}
            </i>
          </li>
        </ul>
      ))}
    </>
  );
};
