import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.styles.scss';

const HomePage = () => {
    return (
        <div className='homepage'>
            <div className='wallpaper'>
                <div className='wallpaper-body'>
                    <h1>Uni<span className='text-color'>ONLINE</span></h1>
                    <p className='mt-5'>Welcome to your newest educational platform, here you can discuss, answer questions, show your portfolio and much more.</p>
                    <div className="mt-5 row justify-content-around">
                        <div className='mt-3'>
                            <Link to='/login' className='btn-login mt'>I already have an account</Link> 
                        </div>
                        <div className='mt-3'>
                            <Link to='/register' className='btn-register'>I want to register</Link>
                        </div>
                    </div>
                    <div className='know-more'>Learn more <p><i className="fas fa-chevron-down"></i></p> </div>
                </div>     
            </div>
            
            <div className='second-body'>
                <div className='container'>
                    <h3 className='text-center py-5'>Functionalities to make your experience better</h3>
                    <div className='row justify-content-around'>
                        <div className='card col-md-5'>
                            <div className='card-head my-4'>
                                <i className="far fa-comment mr-3 fa-lg"></i><span>Discussions</span>
                            </div>
                            <p className='mb-5 text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consectetur quo minima earum quod quos illum adipisci odit expedita in ipsum perspiciatis a iste blanditiis, ad necessitatibus distinctio at dicta.</p>
                        </div>

                        <div className='card col-md-5'>
                            <div className='card-head my-4'>
                            <i className="fas fa-users mr-3 fa-lg"></i><span>Community</span>
                            </div>
                            <p className='mb-5 text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consectetur quo minima earum quod quos illum adipisci odit expedita in ipsum perspiciatis a iste blanditiis, ad necessitatibus distinctio at dicta.</p>
                        </div>

                        <div className='card col-md-5'>
                            <div className='card-head my-4'>
                            <i className="far fa-question-circle mr-3 fa-lg"></i><span>Questions</span>
                            </div>
                            <p className='mb-5 text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consectetur quo minima earum quod quos illum adipisci odit expedita in ipsum perspiciatis a iste blanditiis, ad necessitatibus distinctio at dicta.</p>
                        </div>

                        <div className='card col-md-5'>
                            <div className='card-head my-4'>
                            <i className="far fa-file-alt mr-3 fa-lg"></i><span>Contact Details</span>
                            </div>
                            <p className='mb-5 text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consectetur quo minima earum quod quos illum adipisci odit expedita in ipsum perspiciatis a iste blanditiis, ad necessitatibus distinctio at dicta.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='third-body'>
                <div className='row justify-content-center'>
                    <div className='col-mg-3 mx-5 info'>
                        <h1>400</h1>
                        <p>Registered Students</p>
                    </div>
                    <div className='col-mg-3 mx-5 info'>
                        <h1>700</h1>
                        <p>Open Discussions</p>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default HomePage;