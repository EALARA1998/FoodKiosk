"use client"

import { useStore } from "@/src/stores/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

type OrderSummaryProps = {
  
}

export default function OrderSummary({}:OrderSummaryProps) {

  const { order, clearOrder } = useStore()
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0),[order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order
    }
    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => toast.error(issue.message))
      return
    }
    
    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((error) => toast.error(error.message))
      return
    }
    toast.success("Pedido creado correctamente")
    clearOrder()
  }

  return (
    <>
      <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
        { order.length === 0 ? 
          <p className="text-center my-10">El pedido esta vacio</p> :
          (
            <div className="mt-5">
              {order.map(item => (
                <ProductDetails
                  key={item.id}
                  item={item}
                />
              ))}
              <p className="text-2xl mt-20 text-center">Total a Pagar: {``} <span className="font-bold">{formatCurrency(total)}</span></p>
              <form
                className="w-full mt-10 space-y-5"
                action={handleCreateOrder}
              >
                <input
                  type="text"
                  className="bg-white border border-gray-100 p-2 w-full"
                  placeholder="Tu Nombre"
                  name="name"
                />
                <input
                  type="submit"
                  className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                  value="Confirmar Pedido"
                />
              </form>
            </div>
          )
        }
      </aside>
    </>
  )
}