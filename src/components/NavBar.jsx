import { Button } from "./Button";
import logo from '../images/sun.png';

export const NavBar = () => {
  return (
    <div id='navbar' className='flex justify-between w-full border-b h-18 px-10 md:px-20 lg:px-44 py-6'>
      <div className='flex items-center min-w-44'>
        <img src={logo} className='size-7 mr-2'/>
        <p className='text-2xl'>Solar Panel App</p>
      </div>
      <Button text={'Sign In'} isTransparent={true}/>
    </div>
  )
}