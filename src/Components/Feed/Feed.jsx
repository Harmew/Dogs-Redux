import React from "react";

// Components
import FeedPhotos from "./FeedPhotos";
import FeedModal from "./FeedModal";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";

// PropTypes
import PropTypes from "prop-types";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { loadNewPhotos, resertFeedState } from "../../Store/feed";

const Feed = ({ user }) => {
  const { infinite, loading, list, error } = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resertFeedState());
    dispatch(loadNewPhotos({ user, total: 6 }));
  }, [dispatch, user]);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ user, total: 6 }));
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite, dispatch, user]);

  return (
    <div>
      <FeedModal />
      {list.length > 0 && <FeedPhotos />}
      {loading && <Loading />}
      {error && <Error error={error} />}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.protoTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
