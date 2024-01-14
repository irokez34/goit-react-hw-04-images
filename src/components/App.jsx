import { getSearcth } from 'fetch';
import { Searchbar } from './Searchbar';
import React, { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery';

import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [pages, setPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [isVisible, setIsVisible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPhotos = async (query, page) => {
      if (!query) return;
      setIsLoading(true);
      try {
        const { totalHits, hits } = await getSearcth(query, page);
        if (hits.length === 0) return alert('Нічого не знайдено(');
        setGallery(gallery => {
          return [...gallery, ...hits];
        });
        setIsVisible(pages < Math.ceil(totalHits / 12));
      } catch (error) {
        alert('Виникла помилка');
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos(searchQuery, pages);
  }, [pages, searchQuery]);
  const onHandleSubmit = query => {
    setSearchQuery(query);
    setGallery([]);
    setPages(1);
  };

  const onHandleLoadMore = () => {
    setPages(pages + 1);
  };
  const ToggleModal = e => {
    const control = e === undefined;
    setShowModal(false);
    if (!control) {
      if (e.target.localName === 'img') {
        setModalSrc(e.target.attributes.href.nodeValue);
        setShowModal(true);
      }
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    }
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onHandleSubmit} />
      <ImageGallery images={gallery} onClick={ToggleModal} />
      {showModal && <Modal onClose={ToggleModal} src={modalSrc} />}
      {isLoading && <Loader isLoading={isLoading} />}
      {isVisible && <Button onClick={onHandleLoadMore} />}
    </div>
  );
};
