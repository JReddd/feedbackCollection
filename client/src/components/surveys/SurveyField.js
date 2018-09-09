import React from 'react';

export default ({input, label, meta: {error, touched}} ) => {
    return (
        <div>
            <lable>{label}</lable>
            <input {...input} style={ {marginBottom: '5px'} } />
            <div className="red-text" style={ {marginBottom: '20px'} }>
                {touched && error}
            </div>
        </div>
    );
};