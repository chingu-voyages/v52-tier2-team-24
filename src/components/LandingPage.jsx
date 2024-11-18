import LandingForm from './LandingForm';
import { NavBar } from './NavBar';
import { Button } from './Button';
import {Arrow} from './Arrow';
import installationPic from '../images/solar.jpg';
import nextIcon from '../images/next-black.png';
import solarHouse from '../images/solar-cell.png'
import wfhPic from '../images/workinginhome2.svg';
// import installationPic from '../images/pexels-kindelmedia-9875415.jpg';
// import installationPic from '../images/solar-panel-multicolor.png';

export const LandingPage = () => {
  return (
    <div className=''>
      <div className='bg-gradient-to-t from-white to-landing-blue w-full'>
        <NavBar />

        <div className='flex flex-col flex-wrap lg:flex-row justify-around items-center'>
          <div className='flex flex-col w-full lg:w-3/6 px-12 py-14 md:py-20 md:px-56 sm:mt-28 text-center xl:text-start'>
            <h1 className='text-4xl md:text-5xl min-w-full text-gray-900 mb-5 align-center md:leading-snug'>Power Your World with Solar Energy</h1>
            
            <div className='flex flex-col min-w-max'>
              <h2 className='text-xl md:text-2xl mb-12 leading-normal font-extralight text-gray-700'>Learn more about installation and maintenance <br/>costs with a free evaluation.</h2>
              {/* <p>Save both the planet and your wallet. <br/> Schedule an appointment with a specialist to learn more.</p> */}

              <div className='flex justify-center lg:justify-normal'>
                <Button text={'Schedule an appointment'} isButtonLarge={true}/>
                {/* <Button text={'Contact Us'} isTransparent={true} /> */}
                <span className='flex items-center'>
                  <a href='' className='text-xl ml-8'>Contact Us</a>
                  <img src={nextIcon} className='w-5'/>
                </span>
              </div>
            </div>
          </div>
          <div className='flex w-full lg:w-3/6 justify-center'>
            <img src={wfhPic} className='size-4/6 ' />
          </div>

          {/* <div className=''>
          </div> */}
            {/* <img src={installationPic} className='self-center w-1/2 rounded-lg'/> */}
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