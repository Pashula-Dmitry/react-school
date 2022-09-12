import React from 'react';
import VideoList from '../../shared/components/video-list';
import { Outlet } from 'react-router-dom';
import { useStore } from '../../shared/hooks/useStore';

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
