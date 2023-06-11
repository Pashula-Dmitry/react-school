import React, {useMemo} from 'react';
import { useStore } from '../../shared/hooks/useStore';
import { useSearch } from '../../shared/hooks/useSearch';
import VideoList from '../../shared/components/video-list';
import {Outlet, useParams} from 'react-router-dom';
import { NotFound } from "../../shared/components/not-found";

const VideoListPage = () => {
  const { albumID } = useParams();
  const { state: { videos, albums } } = useStore();
  const { search } = useSearch();

  const currentVideos = albumID ? (albums[albums]?.videos || []) : videos;

  const filteredVideos = useMemo(() => {

    return currentVideos.filter((item) =>  {
      if (item.snippet) {
        return item.snippet.title.toLowerCase().includes(search.toLowerCase());
      }

      return item.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [currentVideos]);


  return (
    <>
      {
        filteredVideos && filteredVideos.length > 0 ? <VideoList videos={filteredVideos} selectMode={false} link={true} /> : <NotFound text="Empty list" />
      }
      <Outlet />
    </>
  );
};

export default VideoListPage;
