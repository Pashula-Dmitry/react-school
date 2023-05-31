import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../shared/hooks/useStore';
import API from '../../core/services/API';
import { fetcher } from '../../shared/helpers/fetch';
import { apiKey, baseURL } from '../../shared/constants/api';
import { addVideos, clearSelects } from '../../shared/store/actions';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import Button from '../../shared/components/UI/button';
import Input from '../../shared/components/UI/input';
import Modal from '../../shared/components/modal';
import VideoList from '../../shared/components/video-list';
import cls from './add-video.module.scss';

const AddVideoPage = () => {
  const [videos, setVideos] = useState(() => []);
  const [search, setSearch] = useState('');
  const { state: { selected }, dispatch } = useStore();
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

    setVideos(data);
  }, [search]);


  const onSave = useCallback(() => {
    const choicesItems = videos.items.filter((video) => selected.includes(video.id.videoId));
    const promises = choicesItems.map((item) => {
      return API.put('/api/videos', {
        title: item.snippet.title,
        description: item.snippet.description || '',
        url: `https://youtu.be/${item.id.videoId}`,
        likes: 16000,
        date: item.snippet.publishTime,
        duration: '3:32',
        imgURL: item?.snippet?.thumbnails?.high,
      });
    });

    Promise.all(promises).then(() => {
      dispatch(addVideos(choicesItems));
      dispatch(clearSelects());
      navigate('/', {replace: true});
    });
  }, [selected]);

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
            <Search />
            <p>Search</p>
          </Button>
        </div>
      </form>
      <div className={cls.listVideos}>
        <VideoList directionList={'column'} videos={videos.items} selectMode={true} link={false} />
      </div>
    </Modal>

  );
};

export default AddVideoPage;

