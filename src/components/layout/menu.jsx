'use client'
import MenuResponsive from './menu-responsive'
import NavLinks from './nav-links'
import { usePathname } from 'next/navigation'

function isHighlight(pathname, href) {
  if (pathname === '/') {
    return href === '/'
  }
  return pathname.includes(href)
}

const Menu = ({
    links
}) => {
  const pathname = usePathname()
  return (
    <>
        <div className='sm:flex hidden gap-4'>
          {
            links?.map((link, index) => (
              <NavLinks key={index} href={link.href} highlight={isHighlight(pathname, link.href)}>
                  {link.text}
              </NavLinks>
            ))
          }
        </div>
        <MenuResponsive links={links} pathname={pathname} />
    </>
  )
}

export default Menu