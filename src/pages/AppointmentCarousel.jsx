import { motion } from "motion/react";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import calendar from "../images/calendar.png";
import { formatAddress } from "../helpers/formatAddress";
import PropTypes from "prop-types";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const AppointmentCarousel = ({ requests, handleApprove, handleCancel }) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;
  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (requests.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((prev) => prev + CARD_SIZE);
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((prev) => prev - CARD_SIZE);
  };

  return (
    <section className=" pb-8" ref={ref}>
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_LEFT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
              >
                <FiArrowLeft />
              </button>
              <button
                className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_RIGHT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="flex"
          >
            {requests.map((request) => (
              <AppointmentCard
                key={request.id}
                request={request}
                handleApprove={handleApprove}
                handleCancel={handleCancel}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AppointmentCard = ({ request, handleApprove, handleCancel }) => {
  return (
    <div
      className="relative shrink-0 bg-white p-4 rounded-lg shadow-md transition-transform hover:-translate-y-1"
      style={{
        width: CARD_WIDTH,
        marginRight: MARGIN,
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center bg-gray-100 rounded-full h-[55px] w-[55px] mb-3">
          <img src={calendar} alt="Calendar" className="h-[40px] w-[40px]" />
        </div>
        <h3 className="text-gray-700 text-lg font-bold">{request.firstName}</h3>
        <h3 className="text-gray-700 text-lg font-bold">{request.lastName}</h3>
        <p className="text-gray-500 text-sm text-center">{request.date}</p>
        <p className="text-gray-500 text-sm mb-2 text-center">{request.time}</p>
        <p className="font-medium text-md text-center">
          {formatAddress(request.address)}
        </p>
        <div className="flex gap-4 items-center mt-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            onClick={() => handleApprove(request.id)}
          >
            ✓
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => handleCancel(request.id)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

AppointmentCarousel.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
AppointmentCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default AppointmentCarousel;
