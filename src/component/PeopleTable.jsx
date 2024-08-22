import { BiSearch } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import vector from "../assets/Vector.png";
import { FaChevronDown } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import UserPane from "./UserPane";
import EditUserForm from "./EditUserForm";
import FilterBox from "./FilterBox";
import AddMemberForm from "./AddMemberForm";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { generateUser } from "../data/data";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PeopleTable = () => {
  const [expandedTeams, setExpandedTeams] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ roles: [], teams: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddMemberVisible, setIsAddMemberVisible] = useState(false);

  // Initialize data with generated users
  const [data, setData] = useState(() =>
    Array.from({ length: 100 }, generateUser)
  );

  const searchQuery = searchParams.get("query") || "";

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      const roleMatch =
        filters.roles.length === 0 || filters.roles.includes(user.role);
      const teamMatch =
        filters.teams.length === 0 ||
        user.teams.some((team) => filters.teams.includes(team));

      const globalMatch =
        searchQuery === "" ||
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );

      return roleMatch && teamMatch && globalMatch;
    });
  }, [data, filters, searchQuery]);

  const handleFilterApply = (filterValues) => {
    setFilters(filterValues);
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setSelectedUser(null);
  };

  const handleRowClick = (user) => {
    console.log("User clicked:", user);
    if (!isEditing) {
      setSelectedUser(user);
    }
  };

  const handleDeleteClick = (userId) => {
    setData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const handleAddMemberClick = () => {
    setIsAddMemberVisible(true);
  };

  const columns = useMemo(
    () => [
      { header: "Name", accessorKey: "name", footer: "Name" },
      { header: "Status", accessorKey: "status", footer: "Status" },
      { header: "Role", accessorKey: "role", footer: "Role" },
      { header: "Email", accessorKey: "email", footer: "Email" },
      { header: "Teams", accessorKey: "teams", footer: "Teams" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const newPagination =
          typeof updater === "function" ? updater(prev) : updater;
        console.log("Pagination changed:", newPagination);
        return newPagination;
      });
    },
  });

  const toggleTeams = (userId) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleFilterClick = () => {
    setFilterVisible(!filterVisible);
  };

  const handleSearchChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchParams({ query: newSearchQuery });
  };

  return (
    <div>
      <div className="py-2 px-2 bg-white shadow-md rounded-md table-fixed">
        {/* Top section */}
        <div className="flex justify-between items-center mb-3 mt-1">
          <div className="flex items-center space-x-4">
            <span className="text-black-600 font-medium">
              Team Members :{" "}
              <span className="text-purple-500 border rounded-lg px-2 bg-slate-50">
                {filteredData.length} Users
              </span>
            </span>
          </div>

          {/* Right section: Search bar, sorting icon, and Add Members button */}
          <div className="flex items-center space-x-2 ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-1 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <BiSearch
                className="absolute right-2 top-2 text-gray-500"
                size={20}
              />
            </div>

            <img src={vector} alt="Sorting Icon" onClick={handleFilterClick} />
            <button
              onClick={handleAddMemberClick}
              className="flex items-center bg-purple-600 text-white px-1 py-1 rounded-md hover:bg-purple-700"
            >
              <AiOutlineUserAdd size={20} className="mr-2" />
              Add Members
            </button>
          </div>
        </div>
        {/* FilterBox Component */}
        <FilterBox
          isVisible={filterVisible}
          onClose={() => setFilterVisible(false)}
          data={data}
          onFilterApply={handleFilterApply}
        />

        {/* Table section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-gray-100 border-b border-gray-300"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-2 px-1 text-gray-700 pr-20"
                    >
                      <div className="flex items-center space-x-1">
                        <span className="text-medium">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.columnDef.accessorKey === "name" && (
                          <FaChevronDown className="text-gray-500 text-xs" />
                        )}
                        {header.column.columnDef.accessorKey === "status" && (
                          <FaChevronDown className="text-gray-500 text-xs" />
                        )}
                        {header.column.columnDef.accessorKey === "role" && (
                          <FiHelpCircle className="text-gray-500 text-xs" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-300 text-xs cursor-pointer"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;
                    if (columnId === "name") {
                      return (
                        <td
                          key={cell.id}
                          className="py-1 px-3 flex items-center space-x-2"
                        >
                          <img
                            src={row.original.image}
                            alt="User"
                            className="w-4 h-4 rounded-full"
                          />
                          <span>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        </td>
                      );
                    }
                    if (columnId === "status") {
                      return (
                        <td key={cell.id} className="py-2 px-3">
                          <button className="flex items-center text-black-500 border border-slate-300 px-1 rounded-md text-xs">
                            <GoDotFill
                              className={`mr-1 ${
                                row.original.status === "Active"
                                  ? "text-green-500"
                                  : row.original.status === "Inactive"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }`}
                            />
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </button>
                        </td>
                      );
                    }
                    if (columnId === "teams") {
                      return (
                        <td key={cell.id} className="py-1 px-3">
                          <div className="flex items-center space-x-2 flex-wrap">
                            {row.original.teams
                              .slice(0, 3)
                              .map((team, index) => (
                                <span key={index} className="mr-2">
                                  {team}
                                </span>
                              ))}
                            {row.original.teams.length > 3 && (
                              <>
                                {expandedTeams[row.original.id] &&
                                  row.original.teams
                                    .slice(3)
                                    .map((team, index) => (
                                      <span key={index + 3} className="mr-2">
                                        {team}
                                      </span>
                                    ))}
                                <button
                                  className="text-blue-500 text-xs"
                                  onClick={() => toggleTeams(row.original.id)}
                                >
                                  {expandedTeams[row.original.id]
                                    ? "Show Less"
                                    : `+${row.original.teams.length - 3}`}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td key={cell.id} className="py-1 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                  <td className="py-1 px-8 flex space-x-2">
                    <MdDelete
                      className="text-red-500 cursor-pointer text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(row.original.id);
                      }}
                    />
                    <MdEdit
                      className="text-blue-500 cursor-pointer text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(row.original);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination section */}
        <div className="flex justify-center space-x-4 py-2 px-2 bg-white shadow-md rounded-md">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-purple-600"
          >
            Previous
          </button>

          {Array.from(
            { length: table.getPageCount() },
            (_, index) => index + 1
          ).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex - 1)}
              disabled={pagination.pageIndex === pageIndex - 1}
              className={`${
                pagination.pageIndex === pageIndex - 1
                  ? "text-white bg-purple-600"
                  : "text-purple-600"
              } py-1 px-2 rounded-md`}
            >
              {pageIndex}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-purple-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit user form */}
      {isEditing && (
        <EditUserForm user={currentUser} onClose={() => setIsEditing(false)} />
      )}

      {/* Side Pane */}
      {selectedUser && (
        <UserPane user={selectedUser} onClose={() => setSelectedUser()} />
      )}

      {isAddMemberVisible && (
        <AddMemberForm onClose={() => setIsAddMemberVisible(false)} />
      )}
    </div>
  );
};

export default PeopleTable;
