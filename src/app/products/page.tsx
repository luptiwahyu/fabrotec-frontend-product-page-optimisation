'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useGetProductsQuery, useGetCategoriesQuery } from './stores/productApi'
import ArrowIcon from './components/arrow-icon'
import css from './styles/index.module.css'
import { Product, Sort } from './models/product'
import { Category } from './models/category'

const Products: FC = () => {
  const {
    isLoading,
    isError,
    data: products = [],
  } = useGetProductsQuery()

  const {
    data: categories = []
  } = useGetCategoriesQuery()

  const sortOptions: Sort[] = [
    {
      slug: 'asc',
      name: 'Lowest Price',
    },
    {
      slug: 'desc',
      name: 'Highest Price',
    },
  ]

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center py-2 animate-fade-in-up">
          <div className="mr-4">Filter Category</div>
          <div className="max-w-sm min-w-[200px] bg-white">
            <div className="relative">
              <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                { categories.map((category) => (
                  <option key={category.slug} value={category.slug}>{category.name}</option>
                ))}
              </select>
              <ArrowIcon />
            </div>
          </div>
        </div>
        <div className="flex items-center py-2">
          <div className="mr-4">Sort By</div>
          <div className="max-w-sm min-w-[200px] bg-white">
            <div className="relative">
              <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                { sortOptions.map((sort) => (
                  <option key={sort.slug} value={sort.slug}>{sort.name}</option>
                ))}
              </select>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {
         products.map((product) => (
            <div
              className="rounded-xl bg-white col-span-1 shadow-md cursor-pointer animate-fade-in-up"
              key={product.id}
            >
              <Image
                src={product.images[0]}
                alt=""
                className="object-cover aspect-square rounded-tl-xl rounded-tr-xl"
                width={300}
                height={300}
              />
              <div className="p-2">
                <div
                  className="mb-1 text-lg font-semibold truncate"
                  title={product.title}
                >
                  {product.title}
                </div>
                <div
                  className="mb-1 text-gray-500 truncate"
                  title={product.description}
                >
                  {product.description}
                </div>
                <div className="text-xl font-bold">${product.price}</div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Products
