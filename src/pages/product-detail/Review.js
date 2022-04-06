import React from 'react'
import {FaStar} from 'react-icons/fa'
function Review() {
  return (
    <div className='mt-5'>
    <h3 className='text-2xl tracking-wider font-bold'>Khách hàng đánh giá</h3>
         <Satisfied/>   
         <Comments/>
    </div>
  )
}

export default Review

const Satisfied=()=>{
    return <div className='flex w-full  bg-light_white mt-5 p-6'>
         <div className='w-1/2' >
             <p>Đánh giá trung bình</p>
              <ul className='flex mt-3'>{Array(5).fill().map(item=><FaStar className='text-[orange] mr-2 text-xl'/>)}</ul>
         </div>
         {/* <div className='w-1/2'>
              <p>Hàng có vừa không?</p>
              <div className='text-xs'><span className='inline-block min-w-[100px] max-w-[100px]' >Nhỏ</span> <span className='inline-block w-[200px] h-2 rounded-md bg-black'></span> </div>
              <div className='flex items-center text-xs'><span className='inline-block min-w-[100px] max-w-[100px]' >Đúng với kích thước</span> <span className='inline-block w-[200px] h-2 rounded-md bg-black'></span> </div>
              <div className='text-xs'><span className='inline-block min-w-[80px] max-w-[80px]' >Lớn</span> <span className='inline-block w-[200px] h-2 rounded-md bg-black'></span> </div>

         </div> */}

    </div>
}
const Comments=()=>{
     return <div>
          
     </div>
}