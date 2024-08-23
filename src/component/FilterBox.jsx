import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FilterBox = ({ isVisible, onClose, data, onFilterApply }) => {
  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Role");

  const navigate = useNavigate();
  const location = useLocation();

  const roles = useMemo(() => {
    const roleSet = new Set(data.map((user) => user.role));
    return Array.from(roleSet);
  }, [data]);

  const teams = useMemo(() => {
    const teamSet = new Set(data.flatMap((user) => user.teams));
    return Array.from(teamSet);
  }, [data]);

  const handleRoleChange = (role) => {
    setSelectedRole((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleTeamChange = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const handleApplyFilters = () => {
    // Update URL with query parameters
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("roles", selectedRole.join(","));
    queryParams.set("teams", selectedTeams.join(","));
    navigate(`?${queryParams.toString()}`);

    // Apply filters and close the box
    onFilterApply({ roles: selectedRole, teams: selectedTeams });
    onClose();
  };

  return (
    isVisible && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600"
          >
            X
          </button>
          <div className="flex mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeFilter === "Role"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveFilter("Role")}
            >
              Role
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeFilter === "Teams"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveFilter("Teams")}
            >
              Teams
            </button>
          </div>

          {activeFilter === "Role" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Role</h3>
              {roles.map((role) => (
                <div key={role} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={selectedRole.includes(role)}
                    onChange={() => handleRoleChange(role)}
                    id={`role-${role}`}
                  />
                  <label htmlFor={`role-${role}`} className="ml-2">
                    {role}
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeFilter === "Teams" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Teams</h3>
              {teams.map((team) => (
                <div key={team} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team)}
                    onChange={() => handleTeamChange(team)}
                    id={`team-${team}`}
                  />
                  <label htmlFor={`team-${team}`} className="ml-2">
                    {team}
                  </label>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleApplyFilters}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    )
  );
};

export default FilterBox;
