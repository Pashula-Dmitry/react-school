import React from 'react';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import Portal from '../portal';
import cls from './modal.module.scss';

const Modal = (props) => {
  const { isOpen, onClose, title, children, renderButtons } = props;

  return (
    <Portal isOpen={isOpen}>
      <div className={cls.modal}>
        <div className={cls.surface}>
          <header className={cls.heading}>
            <p className={cls.title}>{title}</p>
            <Close className={cls.close} onClick={onClose} />
          </header>
          <div className={cls.content}>
            {children}
          </div>
          {
            renderButtons && (
              <div className={cls.actions}>
                {renderButtons}
              </div>
            )
          }
        </div>
        <div className={cls.overlay} onClick={onClose}></div>
      </div>
    </Portal>

  );
};

export default React.memo(Modal);
