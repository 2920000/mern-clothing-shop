import React from 'react'
import Skeleton from './Skeleton'

function CollectionSkeleton() {
  return (
    <div className='w-full'>
         {<Skeleton number={9} type='image' tailwindCss='grid grid-cols-2 lg:grid-cols-3 gap-5' style={{paddingTop:'125%'}}></Skeleton>}

    </div>
  )
}

export default CollectionSkeleton