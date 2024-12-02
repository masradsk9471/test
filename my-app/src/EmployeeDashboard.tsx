import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
}

interface EmployeeDashboardProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ employees, setEmployees }) => {
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  useEffect(() => {
    if (employees.length === 0) {
      axios
        .get<Employee[]>('https://jsonplaceholder.typicode.com/users')
        .then((response: { data: any[] }) => {
          const data = response.data.map((user: any, index: number) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            department: index % 2 === 0 ? 'Engineering' : 'HR',
            designation: index % 2 === 0 ? 'Software Engineer' : 'HR Manager',
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        })
        .catch((error: any) => {
          console.error('Error fetching employee data:', error);
        });
    } else {
      setFilteredEmployees(employees);
    }
  }, [employees, setEmployees]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterEmployees(query, selectedDepartment);
  };

  const handleDepartmentFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    filterEmployees(searchQuery, department);
  };

  const filterEmployees = (query: string, department: string) => {
    let filtered = employees;
    if (query) {
      filtered = filtered.filter((employee) =>
        employee.name.toLowerCase().includes(query)
      );
    }
    if (department) {
      filtered = filtered.filter((employee) => employee.department === department);
    }
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="dashboard">
      <h1>Employee Dashboard</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={selectedDepartment} onChange={handleDepartmentFilter}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </select>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index).map((pageNumber) => (
          <button
            key={pageNumber + 1}
            onClick={() => handlePageClick(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? 'active' : ''}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
