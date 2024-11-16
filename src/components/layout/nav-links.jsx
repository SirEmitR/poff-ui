import Link from "next/link"
const NavLinks = (
    {
        children,
        href,
        highlight,
        responsive
    }
) => {
  return (
    <Link href={href} className={`text-sm transition-colors ${highlight ? 'text-primary' : 'text-secondary hover:text-foreground'} ${responsive && 'text-base'}`}>{children}</Link>
  )
}

export default NavLinks