import React from 'react';
import cls from './watch-video.module.scss';
import VideoList from '../../shared/components/video-list';
import videos from '../add-video/__mock__.json';
import Video from '../../shared/components/video';
import {useParams} from 'react-router-dom';
import Button from '../../shared/components/UI/button';

const WatchVideoPage = () => {
  const params = useParams();

  return (
    <div className={cls.watchPage}>
      <section className={cls.videoSection}>
        <div className={cls.video}>
          <Video
            src={`https://www.youtube.com/embed/${params.videoId}?rel=0;&autoplay=1`}
            width={'100%'}
            height={'100%'}
            allowFullScreen/>
        </div>
        <div className={cls.videoDescription}>
          <div className={cls.text}>
            <div className={cls.title}>Title</div>
            <div className={cls.description}>description</div>
          </div>
          <div className={cls.statistic}>
            <span className={cls.likes}>
              <Button variant={'text'}>

              </Button>
            </span>
            <span className={cls.dateVideo}></span>
          </div>
        </div>
      </section>
      <section className={cls.listOthersSection}>
        <VideoList directionList={'column'} videos={videos.items} link={true} />
      </section>
    </div>
  );
};

export default WatchVideoPage;
