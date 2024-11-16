'use client'

import { useState } from "react"
import Modal from "../experience/modal"
import { BarsIcon } from "../icons"
import NavLinks from "./nav-links"

function isHighlight(pathname, href) {
    if (pathname === '/') {
      return href === '/'
    }
    return pathname.includes(href)
}
  
const MenuResponsive = ({
    links,
    pathname
}) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(!open)
    }
    
  return (
    <div className="block sm:hidden">
        <button onClick={toggleOpen}>
            <BarsIcon />
        </button>
        <Modal props={{
            open,
            onClose: toggleOpen,
            title: '',
            externalClose: true,
            size: 'lg',
            position: 'right',
            overflow: 'hidden'
        }}
        >
            <div className="flex flex-col gap-2 mt-8">
            {
                links?.map((link, index) => (
                    <NavLinks key={index} href={link.href} highlight={isHighlight(pathname, link.href)} responsive>
                        {link.text}
                    </NavLinks>
                ))
            }
            </div>
        </Modal>
    </div>
  )
}

export default MenuResponsive