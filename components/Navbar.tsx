import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="py-2 bg-[#6b3614] text-white drop-shadow-md shadow-lg">
      <div className="container mx-auto w-[1240px] flex justify-between items-center">
        <h1 className="text-2xl font-bold">D</h1>
        <div className="font-semibold">
          <a href="#" className="">
            Home
          </a>
          <a href="#" className="ml-4">
            About
          </a>
          <a href="#" className="ml-4">
            Contact
          </a>
          <Button
            variant="outline"
            className="ml-4 text-black shadow-md font-bold"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
