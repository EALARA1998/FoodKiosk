type HeadingProps = {
  children: React.ReactNode 
}

export default function Heading({children}:HeadingProps) {
  return (
    <>
      <h1 className="text-2xl my-10">
        {children}
      </h1>
    </>
  )
}