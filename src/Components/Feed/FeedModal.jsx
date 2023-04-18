import React from "react";

// CSS
import styles from "./FeedModal.module.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../Store/ui";

// Components
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

const FeedModal = () => {
  const { loading, error, data } = useSelector((state) => state.photo);
  const { modal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  if (!modal) return null;
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
