import React from 'react'

const Loader = () => {
    return (
        <div>
            <div className="spinner-grow mx-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow mx-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow mx-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader