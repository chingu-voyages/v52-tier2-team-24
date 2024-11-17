import LandingForm from './LandingForm';
import { NavBar } from './NavBar';
import { Button } from './Button';
import {Arrow} from './Arrow';
// import installationPic from '../images/pexels-kindelmedia-9875415.jpg';
import installationPic from '../images/solar-panel-multicolor.png';

export const LandingPage = () => {
  return (
    <div className=''>
      <div className='bg-gradient-to-t from-white to-landing-blue'>
        <NavBar />

        <div className='flex sm:flex-col sm:flex-wrap lg:flex-row justify-around'>
          <div className='flex flex-col justify-center sm:w-full md:w-1/2 py-20 px-32 text-center'>
            <h1 className='text-6xl text-gray-900 mb-20 leading-tight font-semibold'>Make the switch to <br/>solar energy</h1>
            
            <div className='flex flex-col self-center w-1/2 -mt-14'>
              <h2 className='text-2xl mb-20 leading-normal font-extralight text-gray-700'>Saving the planet. Saving your wallet.</h2>
              {/* <p>Save both the planet and your wallet. <br/> Schedule an appointment with a specialist to learn more.</p> */}

              <div className='flex items-center'>
                <Button text={'Schedule an appointment'} isButtonLarge={true} />
                <span className='flex items-center'>
                  <a href='' className='text-xl ml-8'>Contact Us</a>
                  <Arrow />
                </span>
              </div>
            </div>
          </div>

          <div className=''>
            <img src={installationPic} className='self-center size-80 max-w-80 rounded-lg'/>
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