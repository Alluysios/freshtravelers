import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__media">
                <ul className='list'>
                    <li className="item"><Link to="/" className="item__link">facebook</Link></li>
                    <li className="item"><Link to="/" className="item__link">instagram</Link></li>
                    <li className="item"><Link to="/" className="item__link">twitter</Link></li>
                </ul>
            </div>
            <p>&copy; 2020 Stress Free. Alluysios Arriba & Quennie Omblero</p>
        </footer>
    )
}

export default Footer
