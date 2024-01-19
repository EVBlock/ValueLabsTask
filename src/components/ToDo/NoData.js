import React from 'react'

export default function NoData() {
  return (
    <div className='flex flex-col items-center justify-center bg-white maxHeightForTable'>
         <span className='text-2xl text-slate-300'>No Data Found!</span>
        <span className='text-lg text-slate-300'>Add tasks from top create new task button.</span>
    </div>
  )
}
