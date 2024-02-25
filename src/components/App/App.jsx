import { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { SearchForm, ImageGallery, Button, Loader } from 'components';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);

        const data = await api.getImages(searchText, page);

        if (data.hits.length === 0) {
          return Notify.info('Sorry image not found...');
        }

        const normalizedImages = api.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        Notify.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchText, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    setSearchText(query);
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 20,
          }}
        >
          Image gallery is empty..
        </p>
      )}
      {images.length > 0 && totalPages !== page && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
    </>
  );
};
