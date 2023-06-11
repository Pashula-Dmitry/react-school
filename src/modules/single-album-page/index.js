import React, {useMemo} from 'react';
import {useStore} from "../../shared/hooks/useStore";
import {useParams} from "react-router-dom";
import VideoListPage from "../video-list";


export const SingleAlbumPage = (props) => {
  const { albumID } = useParams();
  const { state: { albums } } = useStore();

  const currentAlbum = useMemo(() => {
    return albums.find((album) => album.id === +albumID);
  }, [albumID, albums]);

  return (
    <div>
      <h3 style={{ marginBottom: "1rem", fontSize: "30px" }}>Album: {currentAlbum?.title}</h3>
      <p  style={{ marginBottom: "1rem", fontSize: "18px" }}>Description: {currentAlbum?.description}</p>
      <VideoListPage />
    </div>
  );
};
