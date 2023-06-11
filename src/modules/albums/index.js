import React, {useCallback, useState} from 'react';
import {useStore} from '../../shared/hooks/useStore';
import cls from './albums.module.scss';
import Input from '../../shared/components/UI/input';
import Modal from '../../shared/components/modal';
import {useModal} from '../../shared/hooks/useModal';
import API from '../../core/services/API';
import {setAlbums} from '../../shared/store/actions';
import {NotFound} from '../../shared/components/not-found';
import {useNavigate} from 'react-router-dom';
import {stringify} from 'query-string';

export const Albums = () => {
  const { state: { albums }, dispatch } = useStore();
  const {isOpen: isOpenCreateAlbum, closeModal, openModal} = useModal();
  const [nameAlbum, setNameAlbum] = useState('');
  const [descAlbum, setdescAlbumAlbum] = useState('');
  const navigate = useNavigate();

  const handleRemoveAlbum = async (event, id) => {
    event.stopPropagation();
    try {
      const ids = stringify({ ids: [id] });
      const res = await API.delete(`/api/albums?${ids}`);
      await API.get('/api/albums').then((values) => {
        dispatch(setAlbums(values));
      });
    } catch(err) {
      console.error('err => ', err);
    }
  };

  const handleCreate = useCallback(async (event) => {
    event.preventDefault();

    const newAlbum = {
      title: nameAlbum,
      description: descAlbum,
      videos: [],
    };
    try {
      const res = await API.put('/api/albums', newAlbum);
      await API.get('/api/albums').then((values) => {
        dispatch(setAlbums(values));
      });

      setNameAlbum('');
      setdescAlbumAlbum('');
      closeModal();
    } catch(err) {
      console.error('err => ', err);
    }

  }, [nameAlbum, descAlbum]);


  return (
    <div>
      <button className={cls.button} onClick={openModal}>Create a new album</button>
      <h2 className={cls.title}>Albums list:</h2>
      {
        albums && albums.length > 0 ? (
          <table>
            <tr>
              <th>Album name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            {
              albums.map((album) => (
                <tr key={album.id} onClick={() => navigate(`/albums/${album.id}`)}>
                  <td>{album.title}</td>
                  <td>{album.description}</td>
                  <td>
                    <button onClick={(event) => handleRemoveAlbum(event, album.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </table>
        ) : <NotFound text="Empty list" />
      }

      <Modal
        isOpen={isOpenCreateAlbum}
        title="Create a new album"
        onClose={closeModal}
      >
        <form onSubmit={handleCreate}>
          <div className={cls.modalCreateField}>
            <Input
              className={cls.fieldCreate}
              placeholder={'Please, enter album name'}
              type="text"
              onChange={(event) => setNameAlbum(event.target.value)}
              value={nameAlbum} />
            <textarea
              className={cls.description}
              placeholder={'Please, enter album description'}
              value={descAlbum}
              onChange={(event) => setdescAlbumAlbum(event.target.value)}/>
            <button type={'submit'}>Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
