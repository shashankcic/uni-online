import React, { Fragment } from 'react';

import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img
                src={spinner}
                style={{ margin: '300px auto', display: 'block' }}
                alt="loading..."
            />
        </Fragment> 
    )
}

export default Spinner;