export type Field = {
  id: string
  name: string
  city: string
  surface: "sintética" | "natural" | "mixta"
  pricePerHour: number
  rating: number
  image?: string
  amenities: Array<"parqueadero" | "iluminación" | "duchas" | "cafetería">
}
