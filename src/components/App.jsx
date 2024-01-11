import { getSearcth } from 'fetch';
import { Searchbar } from './Searchbar';
import React, { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery';

import { Loader } from './Loader';
import { Button } from './Button';
import Modal from './Modal';

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
  const onHandleSubmit = value => {
    setSearchQuery(value);
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
// export class App extends React.Component {
//   state = {
//     query: '',
//     gallery: [],
//     // isLoading: false,
//     error: null,
//     visibleLoadMore: null,
//     page: 1,
//     totalHits: 0,
//     showModal: false,
//     modalSrc: '',
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.getPhotos(query, page);
//     }
//   }

//   getPhotos = async (query, page) => {
//     if (!query) return;
//     this.setState({ isLoading: true });
//     try {
//       const data = await getSearcth(query, page);
//       if (data.hits.length === 0) return alert('Нічого не знайдено(');

//       this.setState(prev => ({
//         gallery: [...prev.gallery, ...data.hits],
//         visibleLoadMore: this.state.page < Math.ceil(data.totalHits / 12),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };
//   onHandleSubmit = value => {
//     this.setState({
//       query: value,
//       page: 1,
//       gallery: [],
//       totalHits: 0,
//     });
//   };
//   onHandleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };
//   ToggleModal = e => {
//     const control = e === undefined;
//     console.log('work');
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//     if (!control) {
//       if (e.target.localName === 'img') {
//         this.setState({
//           modalSrc: e.target.attributes.href.nodeValue,
//           modalAlt: e.target.attributes.alt.nodeValue,
//         });
//       }
//     }
//   };

//   render() {
//     const {
//       isLoading,
//       gallery,
//       visibleLoadMore,
//       showModal,
//       modalSrc,
//       modalAlt,
//     } = this.state;

//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.onHandleSubmit} />

//         <ImageGallery images={gallery} onClick={this.ToggleModal} />
//         {showModal && (
//           <Modal onClose={this.ToggleModal} src={modalSrc} alt={modalAlt} />
//         )}
//         {/* {isLoading && <Loader isLoading={this.state.isLoading} />} */}
//         {visibleLoadMore && <Button onClick={this.onHandleLoadMore} />}
//       </div>
//     );
//   }
// }
