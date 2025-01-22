"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import HouseIcon from "../icons/house.svg";
import HeartsIcon from "../icons/casal.svg";
import Padrinhos from "../icons/padrinhos.svg";
import Recepcao from "../icons/anel.svg";
import Presente from "../icons/gift.svg";
import Recados from "../icons/recados.svg";

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const menuLinkClasses =
        "menuLink flex flex-col items-center text-gray-800 dark:text-gray-800 hover:filter hover:invert-50 hover:sepia hover:saturate-500 hover:hue-rotate-190";

    const menuItems = [
        { href: "/", label: "Home", icon: HouseIcon },
        { href: "/sobre-nos", label: "Casal", icon: HeartsIcon },
        { href: "/padrinhos", label: "Padrinhos", icon: Padrinhos },
        { href: "/sobre-evento", label: "Cerimonia e Recepção", icon: Recepcao },
        { href: "/presentes", label: "Lista de Presentes", icon: Presente },
        { href: "/recados", label: "Recados", icon: Recados },
    ];

    return (
        <nav className="p-4 bg-gray-100 dark:bg-gray-100">
            <div className="flex justify-between items-center md:hidden">
                <button
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                    className="text-gray-800 dark:text-gray-800 focus:outline-none opacity-100"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            <ul
                className={`flex flex-col md:flex-row justify-between items-center gapfd-4 md:gap-10 px-0 md:px-20 transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                } md:flex`}
            >
                {menuItems.map((item, index) => (
                    <li key={index} className="menuItem">
                        <Link href={item.href} className={menuLinkClasses} onClick={closeMenu}>
                            <item.icon className="w-6 h-6" />
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MenuBar;
