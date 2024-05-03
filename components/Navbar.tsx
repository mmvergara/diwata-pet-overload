import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="py-2 bg-[#994D1C] text-white drop-shadow-md shadow-lg">
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
          <Button className="ml-4 bg-orange-500 shadow-md font-bold">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
