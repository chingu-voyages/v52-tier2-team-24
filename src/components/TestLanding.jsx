import LandingForm from "./LandingForm";
import { NavBar } from "./NavBar";
import { Button } from "./Button";
import { Arrow } from "./Arrow";
import wfhPic from "../images/workinginhome-cropped.svg";
import piggyBankImg from "../images/piggy-bank.png";
import billImg from "../images/bill.png";
import hugImg from "../images/hug.png";
import lightbulbImg from "../images/renewable-energy.png";
import Footer from "../pages/Footer";

const TestLanding = () => {
  return (
    <main className="bg-gradient-to-t from-white to-landing-blue w-full">
      <NavBar />
      {/* HERO */}
      <section>
        <div className="flex flex-col w-full lg:w-3/6 px-12 py-14 md:py-20 xl:pl-56 sm:mt-10 text-center 2xl:text-start">
          <h1 className="text-4xl md:text-5xl lg:max-w-lg w-full text-gray-800 mb-8 align-center md:leading-snug">
            Power Your World with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Solar Energy
            </span>
          </h1>

          <div className="flex flex-col sm:min-w-max">
            <h2 className="text-xl md:text-2xl mb-12 max-w-full leading-normal font-extralight text-gray-700">
              Learn more about installation and maintenance <br />
              costs with a free evaluation.
            </h2>

            <div className="flex justify-center 2xl:justify-normal">
              <Button text={"Schedule an appointment"} isButtonLarge={true} />

              <span className="flex items-center">
                <a href="" className="text-xl ml-8">
                  Contact Us
                </a>
                <Arrow />
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TestLanding;
