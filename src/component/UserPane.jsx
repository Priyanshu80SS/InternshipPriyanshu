import React from "react";

const UserPane = ({ selectedUser, setSelectedUser }) => {
  return (
    selectedUser && (
      <div className="fixed right-0 top-16 w-1/3 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 overflow-y-auto">
        {/* Header Section */}
        <div className="bg-blue-800 text-white py-2 px-4 flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img
              src={selectedUser.image}
              alt="User"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {selectedUser.name}
              </h3>
              <div className="text-sm mb-4">
                <p>
                  <span className="font-semibold">Role:</span>{" "}
                  {selectedUser.role}
                  {" | "}
                  <span className="font-semibold">UserId:</span>{" "}
                  {selectedUser.id}
                </p>
              </div>
            </div>
          </div>

          <button
            className="text-gray-200 hover:text-gray-100 text-2xl"
            onClick={() => setSelectedUser(null)}
          >
            &times;
          </button>
        </div>

        
        <div className="mt-4 bg-light-blue-100 py-2 px-4">
          <h4 className="text-black font-semibold">Personal Information</h4>
        </div>

        {/* Additional Fields in a Single Row */}
        <div className="mt-4 flex flex-wrap space-x-4">
          <div className="flex-1 min-w-[150px]">
            <span className="font-semibold">Date of Birth:</span>{" "}
            {selectedUser.dob}
          </div>
          <div className="flex-1 min-w-[150px]">
            <span className="font-semibold">Gender:</span> {selectedUser.gender}
          </div>
          <div className="flex-1 min-w-[150px]">
            <span className="font-semibold">Nationality:</span>{" "}
            {selectedUser.nationality}
          </div>
          <div className="flex-1 min-w-[150px]">
            <span className="font-semibold">Contact No:</span>{" "}
            {selectedUser.contactNo}
          </div>
          <div className="flex-1 min-w-[150px]">
            <span className="font-semibold">E-mail Address:</span>{" "}
            {selectedUser.email}
          </div>
          <div className="flex-1 min-w-[150px]">
            <span className="font-semibold">Work E-mail Address:</span>{" "}
            {selectedUser.workEmail}
          </div>
        </div>
      </div>
    )
  );
};

export default UserPane;
