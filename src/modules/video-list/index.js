import React, {useMemo} from 'react';
import { useStore } from '../../shared/hooks/useStore';
import { useSearch } from '../../shared/hooks/useSearch';
import VideoList from '../../shared/components/video-list';
import {Outlet, useParams} from 'react-router-dom';
import { NotFound } from "../../shared/components/not-found";
import {setAlbums, setVideos} from "../../shared/store/actions";
import API from "../../core/services/API";
import {stringify} from "query-string";

const VideoListPage = () => {
  const { albumID } = useParams();
  const { state: { videos, albums }, dispatch } = useStore();
  const { search } = useSearch();

  const currentVideos = albumID ? (albums?.find((album) => album.id === +albumID)?.videos || []) : videos;

  const filteredVideos = useMemo(() => {
    return currentVideos.filter((item) =>  {
      if (item.snippet) {
        return item.snippet.title.toLowerCase().includes(search.toLowerCase());
      }

      return item.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [currentVideos, search]);

  const removeVideoFromAlbum = async (videoId) => {
    const album = albums.find((item) => item.id === +albumID);

    await API.patch(`/api/albums`, {
      id: albumID,
      ...album,
      videos: currentVideos.filter((video) => video.videoId !== videoId),
    });
    await API.get('/api/albums').then((values) => {
      dispatch(setAlbums(values));
    });
  };

  const removeVideoFromMainPage = async (videoId) => {
    const video = videos.find((item) => item.videoId === videoId);
    console.log('video => ', video);
    const ids = stringify({ ids: [video.id] });
    console.log('ids => ', ids);
    await API.delete(`/api/videos?${ids}`);
    await API.get('/api/videos').then((values) => {
      dispatch(setVideos(values));
    });
  };


  return (
    <>
      {
        filteredVideos && filteredVideos.length > 0 ? <VideoList onDelete={albumID ? removeVideoFromAlbum : removeVideoFromMainPage} videos={filteredVideos} selectMode={false} link={true} /> : <NotFound text="Empty list" />
      }
      <Outlet />
    </>
  );
};

export default VideoListPage;
