import React from 'react';
import spinner from './spinner.gif'

const Spinner = () => {
    return (
        <div className='spinner'>
            <ul className="spinner__loading">
                <li>L</li>
                <li>O</li>
                <li>A</li>
                <li>D</li>
                <li>I</li>
                <li>N</li>
                <li>G</li>
                <li>.</li>
                <li>.</li>
                <li>.</li>
            </ul>
            <img src={spinner} alt="Plane spinner"/>
        </div>
    )
}

export default Spinner
