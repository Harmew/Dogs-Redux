import React from "react";

// CSS
import styles from "./FeedPhotosItem.module.css";

// Redux
import { useDispatch } from "react-redux";

// Components
import Image from "../Helper/Image";
import { openModal } from "../../Store/ui";
import { fetchPhoto } from "../../Store/photo";

const FeedPhotosItem = ({ photo }) => {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(openModal());
    dispatch(fetchPhoto(photo.id));
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
