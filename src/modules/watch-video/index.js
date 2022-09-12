import React, {useEffect, useState} from 'react';
import cls from './watch-video.module.scss';
import VideoList from '../../shared/components/video-list';
import Video from '../../shared/components/video';
import {useParams} from 'react-router-dom';
import Button from '../../shared/components/UI/button';
import {ReactComponent as LikeIcon} from '../../assets/icons/like.svg';
import {ReactComponent as DateIcon} from '../../assets/icons/date.svg';
import {fetcher} from '../../shared/helpers/fetch';
import {apiKey, baseURL} from '../../shared/constants/api';
import {formatter} from '../../shared/constants/local';

const WatchVideoPage = () => {
  const [video, setVideoInfo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState(() => []);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getVideoInfo = async () => {
      return fetcher(`${baseURL}/videos`, {
        params: {
          key: apiKey,
          part: ['contentDetails', 'snippet', 'statistics', 'liveStreamingDetails'],
          id: params.videoId,
        },
      });
    };
    const getRelatedVideos = async () => {
      return fetcher(`${baseURL}/search`, {
        params: {
          key: apiKey,
          part: ['snippet'],
          relatedToVideoId: params.videoId,
          type: 'video',
          maxResults: 20,
        },
      });
    };

    const promises = [getVideoInfo(), getRelatedVideos()];

    Promise.all(promises).then((res) => {
      setVideoInfo(() => res[0]);
      setRelatedVideos(() => res[1]);
      setIsLoading(() => false);
    }).catch((err) => {
      setIsLoading(() => false);
    });
  }, [params.videoId]);


  return (
    <div className={cls.watchPage}>
      {
        isLoading ? <div>LOADING</div> :
          <>
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
                  <h3 className={cls.title}>{video.items[0].snippet.title}</h3>
                  <p className={cls.description}>{video.items[0].snippet.description}</p>
                </div>
                <div className={cls.statistic}>
                  <Button className={cls.likes} variant={'text'} disableRipple={true}>
                    <LikeIcon className={cls.likeIcon} />
                    <span className={cls.statisticText}>{video.items[0].statistics.likeCount}</span>
                  </Button>
                  <div className={cls.dateVideo}>
                    <DateIcon />
                    <span className={cls.statisticText}>{formatter.format(new Date(video.items[0].snippet.publishedAt))}</span>
                  </div>
                </div>
              </div>
            </section>
            <section className={cls.listOthersSection}>
              <VideoList directionList={'column'} videos={relatedVideos.items} link={true} />
            </section>
          </>
      }

    </div>
  );
};

export default WatchVideoPage;
