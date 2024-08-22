import React from "react";
import PeopleTable from "../component/PeopleTable";

const PeopleDirectory = () => {
  return (
    <div className="w-full h-[calc(100vh-8rem)]  bg-gray-100 rounded-lg shadow-md border border-gray-300 overflow-auto">
      <div className="w-full h-full ">
        <PeopleTable />
      </div>
    </div>
  );
};

export default PeopleDirectory;
