import { useState, useEffect} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import * as ImageService from "./servise/getAPI"
import Button from './Button/Button'
import Loader from "./Loader/Loader";
import { Text } from "./ImageGallery/ImageGallery.styled"


const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [isEmphty, setIsEmphty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState('');
  const per_page = 12;


  handleForm = value => {
    this.setState({
    images: [],
    query: value,
    loading: false,
    error: null,
    page: 1,
    isShow: false,
    isEmphty: false,
     });
  };




   componentDidUpdate(_, prevState) {

    if (prevState.query !== query || prevState.page !== page) {
      this.getImagesGallery(query, page);
    }
  }
  


  
  getImagesGallery = async (query, page) => {
    if (!query) {
      return;
    }
    this.setState({
      loading: true,
    });
    try {
      const images = await ImageService.getImages(this.state.query, this.state.page);
      console.log(images);
      const total = images.total
      console.log(total);
      if (images.images.length === 0) {
         this.setState({ isEmphty: true });
     
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images.images],
        isShow: prevState.page < Math.ceil(images.total / this.per_page),
        total: images.total

      }));
    } catch (error) {
      console.log({ error });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };


  


  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };


  
  return (
    <div>
      <Searchbar onSubmit={handleForm} />
       {loading && <Loader />}
      <ImageGallery images={images} />

      {page < total && !error && (
            <Button onButton={incrementPage} />
      )}
      {isEmphty && (
        <Text textAlign="center">Вибачте, поки немає завантажених зображень... 😭</Text>)}
       
      
    </div>
  );
};
