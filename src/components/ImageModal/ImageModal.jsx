import Modal from "react-modal";
import s from "./ImageModal.module.css"; // Make sure this matches your actual file name

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={s.imageModal}
      overlayClassName={s.imageModalOverlay}
      closeTimeoutMS={300}
    >
      <div className={s.modalContent}>
        <button className={s.modalCloseBtn} onClick={onClose}>
          ×
        </button>

        <div className={s.modalImageContainer}>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash image"}
            className={s.modalImage}
          />
        </div>

        <div className={s.modalInfo}>
          <div className={s.modalHeader}>
            <div className={s.modalUser}>
              {image.user.profile_image && (
                <img
                  src={image.user.profile_image.small}
                  alt={image.user.name}
                  className={s.modalUserAvatar}
                />
              )}
              <div className={s.modalUserDetails}>
                <h3 className={s.modalUserName}>{image.user.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
