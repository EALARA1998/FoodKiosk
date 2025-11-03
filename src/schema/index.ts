import { z } from "zod"

export const OrderSchema = z.object({
  name: z.string()
    .min(1, "Tu Nombre es obligatorio"),
  total: z.number()
    .min(1, "El total del pedido es obligatorio"),
  order: z.array(z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    price: z.number()
  }))
})

export const OrderIdSchema = z.object({
  orderId: z.string().transform((val) => parseInt(val)).refine(value => value > 0, { message: `Hay errores` })
})

export const SearchSchema = z.object({
  search: z.string().trim().min(1, "La busqueda no puede estar vacía")
})

export const ProductSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
  price: z.string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: 'Precio no válido' })
    .or(z.number().min(1, { message: 'La categoría es obligatoria' })),
  categoryId: z.string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: 'La categoría es obligatoria' })
    .or(z.number().min(1, { message: 'La categoría es obligatoria' })),
  image: z.string().min(1, {message: `La imagen es obligatoria`})
})