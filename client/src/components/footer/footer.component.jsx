import React from 'react';

import './footer.styles.scss';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='row justify-content-around'>
                <div className='col-md-4'>
                    <h1>Uni<span>ONLINE</span></h1>
                    <p>Educational platform, focused on discussions and collaboration between students.</p>
                </div>
                <div className='col-md-4'>
                    <h5 className='mt-1'>Useful Links</h5>
                    <a href="/">Contact Us</a>
                    <a href="/">About Us</a>
                </div>
            </div>
            <div className='copyright'>
                <p>All Rights Reserved - 2020 <i className="far fa-copyright"></i></p>
            </div>
        </div>
    )
}

export default Footer;