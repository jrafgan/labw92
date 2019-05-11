import React from 'react';
import imageNotAvailable from '../../assets/images/photo5801815967637023005.jpg';
import {apiURL} from "../../constants";

const ImgThumbnail = props => {
    let image = imageNotAvailable;
    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
    }

    return <img src={image} className={props.class} alt={props.alt} />
};

export default ImgThumbnail;