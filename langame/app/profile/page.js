import React from 'react'
import BottomNavbar from '../components/BottomNav'

function page() {
  return (
    <div className='text-black'>
<div className='flex items-center justify-center h-screen bg-[#0d1829] -mt-6'>
    <div className=' mx-auto bg-white rounded-3xl shadow-xl'>
         <div className="grid rounded-3xl max-w-sm shadow-sm bg-slate-100  flex-col">
      <img
          src="https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX380_CR0,1,380,562_.jpg"
          width="390"
          height="200"
         className="rounded-t-3xl justify-center grid h-80 object-cover"
          alt="movie.title"
        /> 

      <div className="group p-6 grid z-10">
        <a
          href=""
          className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2"
        >
        Nababrata155
        </a>
        <div className="h">
          <span className="line-clamp-4 py-2 text-base font-light leading-relaxed">
          </span>
        </div>
        <div className=" grid-cols-2 flex group justify-between">
          <div className="font-black flex flex-col">
            <span className="text-yellow-500 text-xl">SCORE</span>
            <span className="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
             8.8
             
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="h-7" />
            <span className="text-3xl  font-bold  gap-x-2 text-slate-300">
              # 8
            </span>
          </div>
      </div>
    </div>
    </div></div>
</div>
      <BottomNavbar />
    </div>
  )
}

export default page
