export interface Product {
  id: number,
  title: string,
  description: string,
  images: string[],
}

export interface Sort {
  slug: string
  name: string
}

export interface Params {
  sort: string,
  category: string
}
