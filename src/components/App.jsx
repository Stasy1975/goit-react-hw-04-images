import { useState, useEffect} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import * as ImageService from "./servise/getAPI"
import Button from './Button/Button'
import Loader from "./Loader/Loader";
import { Text } from "./ImageGallery/ImageGallery.styled"


export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [isEmphty, setIsEmphty] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState('');



  const handleForm = value => {
    if (value !== query){
      setImages([]);
      setPage(1);
      setQuery(value);
      setLoading(false);
      setError(null);
      setIsShow(false);
      setIsEmphty(false);
    }
  }
   
  const incrementPage = () => {
    setPage(page + 1)
  };




  useEffect(() => {
    const getImagesGallery = async () => {
      if (!query) {
        return;
      }
      setLoading(true);
      try {
        const images = await ImageService.getImages(query, page);
        console.log(images);
        // setTotal(images.total)
        // console.log(total);
        if (images.images.length === 0) {
          setIsEmphty(true)
     
        }
        setImages(prevState => [...prevState, ...images.images]);
        setIsShow(page < images.total);
        // console.log(isShow)
      }
      catch (error) {
        console.log({ error });
        setError(error)
      } finally {
        setLoading(false);
      }
    }; getImagesGallery()
  }, [query, page]);


  




  
  return (
    <div>
      <Searchbar onSubmit={handleForm} />
      {loading && <Loader />}
      {error && <div>Opsss... {error}</div>}
      <ImageGallery images={images} />

      {isShow && !error &&(
            <Button onButton={incrementPage} />
      )}
      {isEmphty && (
        <Text textAlign="center">Вибачте, поки немає завантажених зображень... 😭</Text>)}
       
      
    </div>
  );
};
