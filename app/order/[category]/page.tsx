import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

type pageProps = {
  params: {
    category: string
  }
}

async function getProducts(category:string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function OrderPage({params}:pageProps) {
  const resolvedParams = await params;
  const { category } = resolvedParams
  const products = await getProducts(category)
  return (
    <>
      <Heading>Elige y Personaliza tu pedido a continuacion</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        { products.map((product)=>(
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </>
  )
}