import wfhPic from '../images/workinginhome2.svg';
import LandingForm from './LandingForm';
// bg-landing-img
export const LandingPageOriginal = () => {
  return (
    <div className='flex'>
      <div className='w-1/2 h-screen bg-gradient-to-t from-landing-blue to-green-100'>
        <img src={wfhPic} className='h-full scale-x-[-1]'/>
      </div>
      <div className='w-1/2 flex justify-center'>
        <LandingForm />
      </div>
    </div>
  )
}