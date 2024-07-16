"use client"
import "./Navbar.css"
import React, { useState } from 'react';
import Link from 'next/link';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);// state variable, state change function
    function toggleMenu() {
        setIsOpen(!isOpen);
    } 
    return (
        <>
            <nav>
                <Link href = "/">
                    <svg id="logo-38" width="78" height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" className="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" className="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" className="ccompli2" fill="#FFBC7D"></path> </svg>
                </Link>
                <div>
                    <ul id = "navlink" className = {isOpen ? "enable" : "disable"}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="DynamicLayout">Dynamic_Layout</Link></li>
                        <li><Link href="Contest">Old_Contest</Link></li>
                        <li><Link href="Template">Template</Link></li>
                    </ul>
                </div>
                <div id = "mobile" onClick = {toggleMenu}>
                    {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                </div>
            </nav>
        </>
    )
}