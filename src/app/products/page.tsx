'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
 } from './stores/productApi'
import ArrowIcon from './components/arrow-icon'
import { Sort } from './models/product'

const Products: FC = () => {
  const [sort, setSort] = useState<string>('asc')
  const [category, setCategory] = useState<string>('')

  const {
    isLoading,
    isFetching,
    data: products = [],
  } = useGetProductsQuery({ category, sort })

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
              <select
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
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
              <select
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                { sortOptions.map((sort) => (
                  <option key={sort.slug} value={sort.slug}>{sort.name}</option>
                ))}
              </select>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>

      {
        (isLoading || isFetching) && <div className="h-[34px] leading-[34px]">Loading...</div>
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {
          !isLoading && !isFetching && products.map((product) => (
            <div
              className="rounded-xl bg-white col-span-1 shadow-md cursor-pointer animate-fade-in-up"
              key={product.id}
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                className="object-cover aspect-square rounded-tl-xl rounded-tr-xl"
                width={500}
                height={500}
                loading="lazy"
                quality={70}
              />
              <div className="p-4">
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
