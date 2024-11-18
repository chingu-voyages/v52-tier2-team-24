export const Button = ({text, isTransparent, isButtonLarge}) => {
  const size = isButtonLarge ? 'text-xl min-w-72 max-w-max px-10 py-3' : 'min-w-28 max-w-64 px-6 py-1.5';

  if (isTransparent) {
    return (
      <button className={`text-black border solid border-slate-500 hover:bg-slate-600 hover:text-white ${size} rounded-3xl`}>{text}</button>
    )
  }

  return (
    <button className={`flex align-center bg-blue-500 text-white hover:bg-blue-600 rounded-3xl ${size}`}>{text}</button>
  )
}