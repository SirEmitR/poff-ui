import {Anton } from 'next/font/google'

const anton = Anton({ subsets: ['latin'] , weight: "400" })

const AntonFont = ({
    children
}) => {
  return (
    <span style={anton.style}>{children}</span>
  )
}

export default AntonFont