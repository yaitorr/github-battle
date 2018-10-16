import PropTypes from 'prop-types';
import React from 'react';

const PlayerPreview = ({avatar, username, children}) => (
    <div>
        <div className='column'>
            <img
                className='avatar'
                src={avatar}
                alt={`Avatar for ${username}`}
            />
            <h2 className='username'>@{username}</h2>
            {children}
        </div>
    </div>
);

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
}

export default PlayerPreview;
