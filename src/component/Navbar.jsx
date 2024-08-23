import { CiBellOn } from "react-icons/ci";
import image from "../assets/john doe.png";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-white">
        <h1 className="text-xl font-bold text-purple-600">PEOPLE.CO</h1>
        <div className="flex items-center space-x-4">
          <CiBellOn className="text-lg" />
          <img
            src={image} 
            alt="Jan Doe"
            className="w-10 h-10 rounded-full border border-gray-300" 
          />
          <h6 className="text-sm font-medium">Jan Doe</h6>
        </div>
      </div>
      <hr className="border-gray-300" />{" "}
  
    </div>
  );
};

export default Navbar;
