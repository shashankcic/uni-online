import React from 'react';

import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrored: false
        }
    }
    
    static getDerivedStateFromError(error) {
        // process the error
        return { hasErrored: true }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if(this.state.hasErrored) {
            return (
                <div className='error-boundary'>
                    <i class="fas fa-exclamation-triangle fa-4x text-danger"></i>
                    <h1>An unexpected error occurred, please try again later.</h1>
                    <p>Contact us and let us know what happened, we will fix the error as soon as possible.</p>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;