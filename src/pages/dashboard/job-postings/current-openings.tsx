import { ShoppingBag } from "lucide-react";
import React from "react";

const CurrentOpenings = () => {
  return (
    <section>
      <div className="flex items-center space-x-8">
        <div className="shadow-md rounded-2xl  justify-center p-4 bg-white h-28 flex flex-col w-full md:w-80">
          <div className="flex items-center space-x-2">
            <ShoppingBag />
            <span className="text-sm font-light ">Total Job Posts</span>
          </div>
          <h1 className="text-2xl font-bold mt-4">{12}</h1>
        </div>
        <div className="shadow-md rounded-2xl justify-center p-4 bg-white h-28 flex flex-col w-full md:w-80">
          <div className="flex items-center space-x-2">
            <ShoppingBag />
            <span className="text-sm font-light ">Qualified Applicants</span>
          </div>
          <h1 className="text-2xl font-bold mt-4">{12}</h1>
        </div>
        <div className="shadow-md rounded-2xl justify-center p-4 bg-white h-28 flex flex-col w-full md:w-80">
          <div className="flex items-center space-x-2">
            <ShoppingBag />
            <span className="text-sm font-light ">Total Applicants</span>
          </div>
          <h1 className="text-2xl font-bold mt-4">{12}</h1>
        </div>
      </div>
    </section>
  );
};

export default CurrentOpenings;
