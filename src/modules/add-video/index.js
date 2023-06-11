import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useStore} from '../../shared/hooks/useStore';
import API from '../../core/services/API';
import {fetcher} from '../../shared/helpers/fetch';
import {apiKey, baseURL} from '../../shared/constants/api';
import {clearSelects, setVideos} from '../../shared/store/actions';
import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg';
import Button from '../../shared/components/UI/button';
import Input from '../../shared/components/UI/input';
import Modal from '../../shared/components/modal';
import VideoList from '../../shared/components/video-list';
import cls from './add-video.module.scss';

const AddVideoPage = () => {
  const [videos, setVideosLocal] = useState(() => []);
  const [search, setSearch] = useState('');
  const {state: {selected}, dispatch} = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    return () => dispatch(clearSelects());
  }, []);

  const handleClose = useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', {replace: true});
    }
  }, []);

  const handleSearch = useCallback(async (event) => {
    event.preventDefault();

    if (search.length === 0) {
      return;
    }

    const data = await fetcher(`${baseURL}/search`, {
      params: {
        key: apiKey,
        type: 'video',
        part: 'snippet',
        maxResults: 20,
        q: search,
      },
    });
    setVideosLocal(data.items.map(video => ({
      title: video?.snippet.title,
      videoId: video?.id?.videoId,
      description: video?.snippet.description || '',
      url: `https://youtu.be/${video?.id?.videoId}`,
      likes: 33222,
      date: video?.snippet.publishedAt,
      duration: '3:32',
      imgURL: video?.snippet?.thumbnails?.high,
    })));
  }, [search]);


  const onSave = useCallback(async () => {
    const choicesItems = videos.filter((video) => selected.includes(video.videoId));
    const promises = choicesItems.map((item) => {
      return API.put('/api/videos', item);
    });
    await Promise.all(promises).then(() => {
      dispatch(clearSelects());
    });

    await API.get('/api/videos').then((values) => {
      dispatch(setVideos(values || []));
    });

    navigate('/', {replace: true});
  }, [selected, videos]);

  return (
    <Modal
      isOpen={location.pathname.includes('add-video')}
      title="Add video to playlist"
      onClose={handleClose}
      renderButtons={
        <>
          <Button variant="text" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={onSave} disabled={selected.length <= 0}>Add video</Button>
        </>
      }
    >
      <form onSubmit={handleSearch}>
        <div className={cls.searchPanel}>
          <Input
            className={cls.search}
            placeholder={'Please, enter your request'}
            type="text"
            onChange={(event) => setSearch(event.target.value)}
            value={search}/>
          <Button variant="contained" type={'submit'}>
            <SearchIcon style={{ maxWidth: "22px", maxHeight: "22px" }} />
            <p>Search</p>
          </Button>
        </div>
      </form>
      <div className={cls.listVideos}>
        <VideoList directionList={'column'} videos={videos} selectMode={true} link={false}/>
      </div>
    </Modal>

  );
};

export default AddVideoPage;

