import React from "react";

// CSS
import styles from "./FeedPhotos.module.css";

// Components
import FeedPhotosItem from "./FeedPhotosItem";
import { useSelector } from "react-redux";

const FeedPhotos = ({ setModalPhoto }) => {
  const { list } = useSelector((state) => state.feed);

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {list.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
};

export default FeedPhotos;
