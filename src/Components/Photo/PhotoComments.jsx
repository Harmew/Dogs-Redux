import React from "react";

// CSS
import styles from "./PhotoComments.module.css";

// Redux
import { useSelector } from "react-redux";

// Components
import PhotoCommentsForm from "./PhotoCommentsForm";

const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const commentSections = React.useRef(null);

  const { data } = useSelector((state) => state.user);

  React.useEffect(() => {
    commentSections.current.scrollTop = commentSections.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentSections}
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {data && (
        <PhotoCommentsForm
          id={props.id}
          single={props.single}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
