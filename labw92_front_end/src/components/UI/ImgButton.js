import React, {Fragment} from 'react';

const ImgButton = props => {
    return (
        <Fragment>
            <img src={props.src} alt="button" id={props.id} className={props.class}/>
        </Fragment>
    );
};

export default ImgButton;