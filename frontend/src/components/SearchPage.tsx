import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FilterPage from './FilterPage';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Globe, MapPin, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import heroImage from '@/assets/hero_pizza.png'

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* Search Iput Field */}
          <div className="flex items-center gap-2">
            <Input
              type='text'
              placeholder='Search by restaurant & cuisines'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className='bg-orange-500 hover:bg-orange-700'>Search</Button>
          </div>
          {/* Searched items display here */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
            <h1 className='font-medium text-lg'>(2) result found</h1>
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {
                ['Biryani', 'Rice', 'Roti', 'Meat', 'Anda'].map((selectedFilter: string, index: number) => (
                  <div
                    key={index}
                    className="relative inline-flex max-w-full">
                    <Badge className='text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap' variant={'outline'}>{selectedFilter}</Badge>
                    <X
                      size={16}
                      className='absolute text-[#D19254] right-1 hover:cursor-pointer' />
                  </div>
                ))
              }

            </div>
          </div>
          {/* Restaurant Card */}
          <div className="grid md:grid-cols-3 gap-4">
            {
              [1, 2, 3].map((items: number, index: number) => (

                <Card key={index} className='bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300'>
                  <div className="relative">
                    <AspectRatio ratio={16 / 6}>
                      <img src={heroImage} alt="" className='w-full h-full object-cover' />
                    </AspectRatio>
                    <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                      <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className='p-4'>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-300'>Pizza Hunt</h1>
                    <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      <p className='text-sm'>
                        City:{" "}
                        <span className='font-medium'>Delhi</span>
                      </p>
                    </div>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                      <Globe size={16} />
                      <p className='text-sm'>
                        Country:{" "}
                        <span className='font-medium'>India</span>
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {
                        ['Biryani', 'momos', 'jalebi'].map((cuisine: string, index: number) => (
                          <Badge key={index}
                            className='font-medium px-2 py-1 rounded-full shadow-sm'
                          >{cuisine}</Badge>
                        ))
                      }
                    </div>
                  </CardContent>
                  <CardFooter className='p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end'>
                    <Link to={`/restauant/${123}`}>
                      <Button className='font-semibold bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded-full shadow-md transition-colors duration-200'>View Menus</Button>
                    </Link>
                  </CardFooter>
                </Card>

              ))
            }
          </div>



        </div>

      </div>

    </div>
  );
}

export default SearchPage


const SearchPageSkeleton = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16 / 6}>
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
              </AspectRatio>
              <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
              <div className="h-10 w-28 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </CardFooter>
          </Card>
        ))}
      </div>


    </>
  )
}


const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className='text-center'>
      <h1 className='text-2xl font-semibold text-gray-700 dark:text-gray-800'>No Result Found</h1>
      <p className='mt-2 text-gray-500 dark:text-gray-400'>We couldn't any results for "{searchText}". <br /> Try Search with a different term</p>
      <Link to='/'>
        <Button className='mt-4 bg-orange-500 hover:bg-orange-700'>
          Go Back to Home
        </Button>
      </Link>
    </div>
  )
}