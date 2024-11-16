import { Oswald } from "next/font/google"

const oswald = Oswald({ subsets: ['latin'] , weights: ["400", "600"] })

const OswaldFont = ({
    children
}) => {
  return (
    <span style={oswald.style}>{children}</span>
  )
}

export default OswaldFont