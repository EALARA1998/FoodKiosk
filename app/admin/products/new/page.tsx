import AddProductForm from "@/components/products/AddProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/ui/Heading"

type pageProps = {
  
}

export default function CreateProductPage({}:pageProps) {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  )
}