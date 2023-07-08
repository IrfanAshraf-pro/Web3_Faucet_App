"use client"
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container d-flex align-items-center justify-content-between">
                    <Link href="/" className='navbar-brand'>
                        <span className=' fs-2'>Faucet</span>
                    </Link>
                    <button
                        className={`navbar-toggler ${isCollapsed ? 'collapsed' : ''}`}
                        type="button"
                        onClick={toggleNavbar}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
                        <ul className="navbar-nav ms-auto me-0">
                            <li className="nav-item">
                                <Link href="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/services" className="nav-link">
                                    Services
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
