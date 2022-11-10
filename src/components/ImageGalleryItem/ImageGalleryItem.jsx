import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ImageGalleryImage, GalleryItem } from './ImageGalleryItem.styled'
import { ModalWindow } from 'components/Modal/Modal';

export const ImageGalleryItem = ({image}) => {
 const [showModal, setOpenModal] = useState(false);
const { largeImageURL, webformatURL, tags } = image;

 
  const togleModal = () => {
    setOpenModal(prevState=>!prevState)
  }

  
    

    return (
      <GalleryItem>
        <ImageGalleryImage onClick={togleModal}
         src={webformatURL}
          alt={tags}
        />
        {showModal && (
          <ModalWindow src={largeImageURL} alt={tags} onClose={togleModal} />
        )}
      </GalleryItem>
    )
  }


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};


// <Grid>
//           {this.state.img.map(item => (
//             <GridItem key={item.id}>
//               <CardItem color={item.avg_color}>
//                 <img src={item.src.large} alt={item.alt} />
//               </CardItem>
//             </GridItem>
//           ))}
//         </Grid>