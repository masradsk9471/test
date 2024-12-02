import React, { useState } from 'react';

import './App.css'; 
import EmployeeDashboard from './EmployeeDashboard';
import AddEmployee from './AddEmployee';


interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
}

const App: React.FC = () => {
  const [employees, setEmployees] = useState <Employee[]>([]);

  const handleAddEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  return (
    <div className="app">
      <EmployeeDashboard employees={employees} setEmployees={setEmployees} />
      <AddEmployee onAddEmployee={handleAddEmployee} />
    </div>
  );
};

export default App;
