import React, {useState} from 'react';
import Modal from "../modal";
import {useModal} from "../../hooks/useModal";
import {ReactComponent as ListIcon} from '../../../assets/icons/list.svg';
import cls from './add-album.module.scss';
import Button from "../UI/button";
import {useStore} from "../../hooks/useStore";
import API from "../../../core/services/API";
import {setAlbums} from "../../store/actions";


export const AddAlbum = (props) => {
  const {video} = props;
  const {isOpen: isOpenAddAlbum, closeModal, openModal} = useModal();
  const {state: {albums}, dispatch} = useStore();
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0]?.id || -1);
  console.log('video => ', video);
  const handleAddToAlbum = async (event) => {
    event.preventDefault();

    const album = albums.find((item) => item.id === +selectedAlbum);

    const currentVideo = {
      title: video?.items[0]?.snippet.title,
      videoId: video?.items[0]?.id,
      description: video?.items[0]?.snippet.description || '',
      url: `https://youtu.be/${video?.items[0]?.id}`,
      likes: video?.items[0]?.statistics?.likeCount,
      date: video?.items[0]?.snippet.publishedAt,
      duration: '3:32',
      imgURL: video?.items[0]?.snippet?.thumbnails?.high,
    };

    await API.patch(`/api/albums`, {
      id: selectedAlbum,
      ...album,
      videos: [currentVideo, ...album.videos],
    });
    await API.get('/api/albums').then((values) => {
      dispatch(setAlbums(values));
    });

    closeModal();

  };

  return (
    <>
      <Button className={cls.btn} onClick={openModal} variant={'text'} disableRipple={true}>
        <ListIcon className={cls.icon}/>
        <span>Add to Album</span>
      </Button>
      <Modal
        isOpen={isOpenAddAlbum}
        title="Add video to album"
        onClose={closeModal}
      >
        <form onSubmit={handleAddToAlbum}>
          <div className={cls.center}>
            <div>
              <div className={cls.customSelect}>
                <select value={selectedAlbum} onChange={(event) => setSelectedAlbum(event.target.value)}>
                  {
                    albums && albums.map(({title, id}) => (
                      <option key={id} value={id}>{title}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <Button disabled={selectedAlbum === -1} type="submit" className={cls.btnAddToAlbum} variant={'contained'} disableRipple={true}>
              Add to album
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
