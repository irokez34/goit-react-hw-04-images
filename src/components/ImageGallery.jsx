import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  if (images.length > 0) {
    const resultImages = images.map(
      ({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          modal={largeImageURL}
          onClick={onClick}
          onKeyDown={e => e.key === 'Enter' && onClick(e)}
        />
      )
    );
    return <ul className="ImageGallery">{resultImages}</ul>;
  }
};
