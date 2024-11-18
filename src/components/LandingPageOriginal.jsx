import wfhPic from '../images/workinginhome.svg';
import LandingForm from './LandingForm';
import { NavBar } from './NavBar';

export const LandingPageOriginal = () => {
  return (
    <div className='flex'>
      <div className='w-0 lg:w-1/2 h-screen bg-gradient-to-b from-landing-blue to-green-100'>
        <img src={wfhPic} className='h-full scale-x-[-1]'/>
      </div>
      <div className='w-full lg:w-1/2 flex flex-col justify-center'>
        <NavBar className={'lg:px-10'}/>

        <div className='flex flex-col w-full py-14 md:-mt-2 xl:pl-18 sm:mt-10 text-center 2xl:text-start items-center'>
          <h1 className='text-4xl md:text-5xl text-gray-800 mb-8 align-center md:leading-snug text-center'>Power Your World <br/>with <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Solar Energy</span></h1>
          
          <div className='flex flex-col sm:min-w-max'>
            <h2 className='text-xl md:text-2xl max-w-full leading-normal font-extralight text-gray-700 text-center'>
              Learn more about installation and maintenance <br/>costs with a free evaluation. Request an appointment below.
            </h2>
          </div>
        <LandingForm />
        </div>
      </div>
    </div>
  )
}