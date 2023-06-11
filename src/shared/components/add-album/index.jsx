import React from 'react';
import Modal from "../modal";
import {useModal} from "../../hooks/useModal";
import {ReactComponent as ListIcon} from '../../../assets/icons/list.svg';
import cls from './add-album.module.scss';
import Button from "../UI/button";
import {useStore} from "../../hooks/useStore";


export const AddAlbum = (props) => {
  const {isOpen: isOpenAddAlbum, closeModal, openModal} = useModal();
  const { state: { albums } } = useStore();

  const handleAddToAlbum = (event) => {
    event.preventDefault();
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
                <select >
                  {
                    albums && albums.map(({title, id}) => (
                      <option key={id} value={id}>{title}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <Button type="submit" className={cls.btnAddToAlbum} variant={'contained'} disableRipple={true}>
              Add to album
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
