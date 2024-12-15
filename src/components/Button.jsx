import PropTypes from "prop-types";

export const Button = ({ text, isTransparent, isButtonLarge, onClick, clickToSchedule }) => {
  const size = isButtonLarge
    ? "text-xl min-w-72 max-w-max px-10 py-3"
    : "min-w-28 max-w-64 px-6 py-1.5";

  if (isTransparent) {
    return (
      <button
        className={`text-black border solid border-slate-500   hover:bg-slate-600 hover:text-white  rounded-3xl text-sm inline-flex items-center justify-center whitespace-nowrap px-6 py-3 ${size}` }
        onClick={() => onClick()}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      className={`flex align-center bg-red-500 text-white hover:bg-red-600 rounded-3xl ${size}`}
      onClick={() => clickToSchedule()}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isTransparent: PropTypes.bool,
  isButtonLarge: PropTypes.bool,
  onClick: PropTypes.func,
  clickToSchedule: PropTypes.func
};
