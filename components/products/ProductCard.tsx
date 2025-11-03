import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({product}:ProductCardProps) {

  const imagePath = getImagePath(product.image)

  return (
    <div className="border bg-white">
      <div className="relative w-[400px] h-[500px]">
        <Image
          src={imagePath}
          alt={`Imagen platillo ${product.name}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
        <AddProductButton product={product}/>
      </div>
    </div>
  )
}