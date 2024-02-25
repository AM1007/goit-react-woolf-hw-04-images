import { useState } from 'react';
import s from './ImageGalleryItem.module.css';
import { Modal } from 'components';

export const ImageGalleryItem = ({ image }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(prev => !prev);
  };

  return (
    <>
      <li className={s.imageGalleryItem}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={s.imageGalleryItem__image}
          loading="lazy"
          onClick={toggleModal}
        />
        {isShowModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClose={toggleModal}
          />
        )}
      </li>
    </>
  );
};
