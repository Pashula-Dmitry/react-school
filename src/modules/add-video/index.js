import React, {useCallback, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/UI/button';
import Input from '../../shared/components/UI/input';
import Modal from '../../shared/components/modal';
import cls from './add-video.module.scss';
import { debounce } from '../../shared/helpers/debounce';
import {fetcher} from '../../shared/helpers/fetch';
import {apiKey, baseURL} from '../../shared/constants/api';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import VideoList from '../../shared/components/video-list';
import API from '../../core/services/API';
import {useStore} from '../../shared/hooks/useStore';
import {addVideos, clearSelects} from '../../shared/store/actions';

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

  const handleSearch = useCallback(debounce(async () => {
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
  }, 200), [search]);


  const onSave = useCallback(() => {
    const choicesItems = videos.items.filter((video) => selected.includes(video.id.videoId));

    const promises = choicesItems.map((item) => {
      return API.put('/api/videos', {
        title: item.snippet.title,
        description: item.snippet.description,
        url: `https://youtu.be/${item.id.videoId}`,
        likes: 16000,
        date: item.snippet.publishTime,
        duration: '3:32',
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
      <div className={cls.searchPanel}>
        <Input
          className={cls.search}
          placeholder={'Please, enter your request'}
          type="text"
          onChange={(event) => setSearch(event.target.value)}
          value={search}/>
        <Button variant="contained" onClick={handleSearch}>
          <Search />
          <p>Search</p>
        </Button>
      </div>
      <div className={cls.listVideos}>
        <VideoList directionList={'column'} videos={videos.items} selectMode={true} link={false} />
      </div>
    </Modal>

  );
};

export default AddVideoPage;

