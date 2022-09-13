import React from 'react';
import { useStore } from '../../shared/hooks/useStore';
import VideoList from '../../shared/components/video-list';
import { Outlet } from 'react-router-dom';

const VideoListPage = () => {
  const { state: { videos } } = useStore();

  return (
    <>
      <VideoList videos={videos} selectMode={false} link={true} />
      <Outlet />
    </>
  );
};

export default VideoListPage;
