import { File, ShoppingBag, User } from "lucide-react";
import React from "react";

const CurrentOpenings = () => {
  const [stats, setStats] = React.useState([
    {
      title: "Total Job Posts",
      value: 12,
      icon: <ShoppingBag />,
    },
    {
      title: "Qualified Applicants",
      value: 12,
      icon: <User />,
    },
    {
      title: "Total Applicants",
      value: 300,
      icon: <File />,
    },
  ]);
  return (
    <section>
      <div className="flex items-center space-x-8">
        {stats.map((stat, index) => (
          <div className="shadow-md rounded-2xl  justify-center p-4 bg-white h-28 flex flex-col w-full md:w-80">
            <div className="flex items-center space-x-2">
              {stat.icon}
              <span className="text-sm font-light ">{stat.title}</span>
            </div>
            <h1 className="text-2xl font-bold mt-4">{stat.value}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentOpenings;
