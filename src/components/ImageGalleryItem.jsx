export const ImageGalleryItem = ({ src, alt, onClick, modal, key}) => {
  return (
    <li className="ImageGalleryItem" id = {key}> 
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={alt}
        onClick={onClick}
        href={modal}
      />
    </li>
  );
};
