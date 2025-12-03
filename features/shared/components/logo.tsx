import Image from "next/image"

const Logo = () => {
  return (
    <Image
      src="/icons/logo.svg"
      alt='Logo'
      width={137}
      height={36}
    />
  )
}

export default Logo