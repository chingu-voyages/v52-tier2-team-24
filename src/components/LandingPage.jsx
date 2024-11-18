import LandingForm from './LandingForm';
import { NavBar } from './NavBar';
import { Button } from './Button';
import {Arrow} from './Arrow';
import nextIcon from '../images/next-black.png';
import wfhPic from '../images/workinginhome2.svg';

export const LandingPage = () => {
  return (
    <div className=''>
      <div className='bg-gradient-to-t from-white to-landing-blue w-full'>
        <NavBar />

        <div className='flex flex-col flex-wrap lg:flex-row justify-around items-center'>
          <div className='flex flex-col w-full lg:w-3/6 px-12 py-14 md:py-20 xl:pl-56 sm:mt-10 text-center 2xl:text-start'>
            <h1 className='text-4xl md:text-5xl lg:max-w-lg w-full text-gray-900 mb-5 align-center md:leading-snug'>Power Your World with Solar Energy</h1>
            
            <div className='flex flex-col sm:min-w-max'>
              <h2 className='text-xl md:text-2xl mb-12 max-w-full leading-normal font-extralight text-gray-700'>Learn more about installation and maintenance <br/>costs with a free evaluation.</h2>
              {/* <p>Save both the planet and your wallet. <br/> Schedule an appointment with a specialist to learn more.</p> */}

              <div className='flex justify-center 2xl:justify-normal'>
                <Button text={'Schedule an appointment'} isButtonLarge={true}/>
                {/* <Button text={'Contact Us'} isTransparent={true} /> */}
                <span className='flex items-center'>
                  <a href='' className='text-xl ml-8'>Contact Us</a>
                  <img src={nextIcon} className='w-5'/>
                </span>
              </div>
            </div>
          </div>
          <div className='flex w-full md:w-3/6 justify-center 2xl:justify-normal'>
            <img src={wfhPic} className='size-5/6 justify-self-center' />
          </div>
        </div>
      </div>




          {/* <LandingForm /> */}
        {/* </div> */}

        {/* <div id=''>
          <img id="landing-image" src="/images/cropped-la.png" width="100%" style={landingImageStyle} />
        </div> */}
    </div>
  )
}