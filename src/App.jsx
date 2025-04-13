import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./services/api";
import "./App.css";

Modal.setAppElement("#root");

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);

        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {images.length > 0 && (
            <ImageGallery images={images} onImageClick={handleImageClick} />
          )}

          {isLoading && (
            <div className="loader-container">
              <ClipLoader color="#3f51b5" size={50} />
            </div>
          )}

          {images.length > 0 && !isLoading && page < totalPages && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
