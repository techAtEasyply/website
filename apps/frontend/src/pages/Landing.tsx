import { LampContainer } from '@/components/ui/lamp'
import { content } from 'html2canvas/dist/types/css/property-descriptors/content'
import React from 'react'


function Landing() {
  return (
    <>
      <div className='bg-[#020617]'>

      <div className='w-[64%] h-fit border-2 border-gray-900  mx-auto  bg-black'>
          <NavBar />
              <LampContainer className='h-fit' >
            <Main />
          </LampContainer>



      </div>
      </div>
    </>

  )
}

export default Landing


function NavBar() {
  return (
    <>
      <div className=' h-[70px] mt-3  mx-8  border-b-2 border-gray-800 grid grid-cols-3'>
        <div className='h-full text-white
        text-xl flex justify-start items-center px-2 gap-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-no-axes-combined text-primary fill-purple-primary"><path d="M12 16v5"></path><path d="M16 14v7"></path><path d="M20 10v11"></path><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"></path><path d="M4 18v3"></path><path d="M8 14v7"></path></svg>
          <h1>EASYPLY</h1>
        </div>
        <div className='text-white flex justify-center items-center gap-x-8 text-sm'>
          <div>About</div>
          <div>Pricing</div>
        </div>
        <div className='flex justify-end items-center gap-x-2'>
        <Button content='Login' className='text-white text-sm hover:bg-gray-800'  />
        <Button content='Get Started' className='bg-purple-primary text-sm text-white'/>

        </div>
      </div>
    </>
  )
}

function Button({content , className}) {
  return (
    <>
      <button className={`py-2 px-4  rounded-xl ${className}`}> {content}</button>
    </>
 )
}


function Main() {
  return (
    <>
      <section className=' relative w-full h-fit flex flex-col justify-center pb-24 text-white border-b-2 border-gray-900 items-center '>
            <div className='flex flex-col h-fit justify-center items-center w-[45%]  gap-y-6'>
              {/* <div className=' h-fit bg-gray-800 text-sm gap-x-3 pr-3 flex px-1 py-1 rounded-full'>
                <p className='bg-purple-primary rounded-full px-2'>New</p>
                <p>making you job hut simplified</p>
              </div> */}
            <h1 className='text-7xl font-semibold mt-32'>EASYPLY</h1>
            <p className='text-2xl text-gray-500 text-center'>Empowering careers with instant resumes, smart job matching, and AI-driven interview preparation.</p>
     <Button content='Get Early Access Now' className='bg-purple-primary px-6 py-4  text-sm text-white'/>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkle absolute left-0 -bottom-3 -translate-x-1/2 fill-foreground "><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkle absolute -right-5 -bottom-3 -translate-x-1/2 fill-foreground "><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path></svg>
          </section>
    </>
  )
}