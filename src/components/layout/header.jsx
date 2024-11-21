import Link from "next/link"
import AuthButton from "../auth/auth-button"
import Menu from "./menu"

const links = [
    {
        href: '/',
        text: 'Inicio'
    },
    {
        href: '/equipos',
        text: 'Equipos'
    },
]

const Header = () => {
  return (
    <header className="w-full px-10 sm:px-20 py-4 border-b border-tertiary">
        <menu className="flex justify-between items-center">
            <Link href="/">
                <img src="/images/poff.png" alt="Liga POFF" className="aspect-auto h-9 sm:h-10" />
            </Link>
            <div className="flex flex-1 items-center gap-4 flex-row-reverse sm:flex-row sm:justify-between">
                <Menu links={links} />
                <AuthButton />
            </div>
        </menu>
    </header>
  )
}

export default Header