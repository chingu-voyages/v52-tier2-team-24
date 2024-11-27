import LandingForm from './LandingForm';
import { NavBar } from './NavBar';
import { Button } from './Button';
import {Arrow} from './Arrow';
import wfhPic from '../images/workinginhome-cropped.svg';
import piggyBankImg from '../images/piggy-bank.png';
import billImg from '../images/bill.png';
import hugImg from '../images/hug.png';
import lightbulbImg from '../images/renewable-energy.png'
import Footer from '../pages/Footer';

export const LandingPage = () => {
  return (
    <div className=''>
      <div className='bg-gradient-to-t from-white to-landing-blue w-full'>
        <NavBar />

        <div className='flex flex-col flex-wrap lg:flex-row justify-around items-center'>
          <div className='flex flex-col w-full lg:w-3/6 px-12 py-14 md:py-20 xl:pl-56 sm:mt-10 text-center 2xl:text-start'>
            <h1 className='text-4xl md:text-5xl lg:max-w-lg w-full text-gray-800 mb-8 align-center md:leading-snug'>Power Your World with <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Solar Energy</span></h1>
            
            <div className='flex flex-col sm:min-w-max'>
              <h2 className='text-xl md:text-2xl mb-12 max-w-full leading-normal font-extralight text-gray-700'>
                Learn more about installation and maintenance <br/>costs with a free evaluation.
              </h2>

              <div className='flex justify-center 2xl:justify-normal'>
                <Button text={'Schedule an appointment'} isButtonLarge={true}/>
                
                <span className='flex items-center'>
                  <a href='' className='text-xl ml-8'>Contact Us</a>
                  <Arrow/>
                </span>
              </div>
            </div>
          </div>

          <div className='flex w-full md:w-3/6 justify-center 2xl:justify-normal'>
            <img src={wfhPic} className='size-5/6 justify-self-center' />
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center px-56 py-20 text-center w-full'>
        <div className='flex w-inherit flex-col lg:flex-row text-start justify-around mb-14 self-center'>
          <div className='flex flex-col lg:border border-gray-300 min-w-60 lg:w-1/5 p-10 lg:rounded-2xl lg:shadow-md mb-5'>
            <img src={billImg} className='h-32 self-center mb-5'/>
            <div className='w-full flex flex-col items-center lg:items-start'>
              <h3 className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4'>Lower energy bills</h3>
              <p className='text-lg font-light'>Reduce your monthly electric costs</p>
            </div>
          </div>

          <div className='flex flex-col lg:border border-gray-300 min-w-60 lg:w-1/5 p-10 lg:rounded-2xl lg:shadow-md mb-5'>
            <img src={hugImg} className='h-32 self-center mb-5'/>
            <div className='w-full flex flex-col items-center lg:items-start'>
              <h3 className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4'>Eco-friendly impact</h3>
              <p className='text-lg font-light'>Smaller carbon footprint with clean, renewable energy</p>
            </div>
          </div>

          <div className='flex flex-col lg:border border-gray-300 min-w-60 lg:w-1/5 p-10 lg:rounded-2xl lg:shadow-md mb-5'>
            <img src={piggyBankImg} className='h-32 self-center mb-5'/>
            <div className='w-full flex flex-col items-center lg:items-start'>
              <h3 className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4'>Claim tax incentives</h3>
              <p className='text-lg font-light'>Taxpayers can claim the federal solar energy tax credit</p>
            </div>
          </div>

          <div className='flex flex-col lg:border border-gray-300 min-w-60 lg:w-1/5 p-10 lg:rounded-2xl lg:shadow-md mb-5'>
            <img src={lightbulbImg} className='h-32 self-center mb-5'/>
            <div className='w-full flex flex-col items-center lg:items-start'>
              <h3 className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4'>Energy security</h3>
              <p className='text-lg font-light'>Backup power during outages when pair with battery storage </p>
            </div>
          </div>
        </div>
        
        <p className='text-2xl font-light lg:mb-14 w-svw self-center p-10'>Join Los Angeles’ effort to combat global warming by switching to solar power!</p>
        
        <div className='flex justify-center'>
          <LandingForm />
        </div>

        <h2 className='flex text-3xl self-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mt-20'>Save the planet. Save your wallet.</h2>
      </div>
      {/* <div className='flex border-t border-t-gray-300 w-screen mt-8 p-8 justify-end items-center'>
        <p className='font-extralight'>© Chingu Team24 F/W 2024</p>
      </div> */}
      <Footer/>
    </div>
  )
}