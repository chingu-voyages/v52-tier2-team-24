import github from "../images/github.svg";

export default function Footer() {
    return (
      <footer className="flex justify-center items-center text-button text-md mt-10 m-4">
        © 2024 Team 24 of Voyage 52
        <a href="https://github.com/chingu-voyages/v52-tier2-team-24" target="_blank">
          <img
            src={github}
            className="w-6 h-6 ml-2"
            alt="GitHub Logo"
          ></img>
        </a>
      </footer>
    );
  }
  