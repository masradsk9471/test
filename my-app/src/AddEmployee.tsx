import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
}

interface AddEmployeeProps {
  onAddEmployee: (employee: Employee) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !department || !designation) {
      alert('All fields are required');
      return;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      name,
      email,
      department,
      designation,
    };

    onAddEmployee(newEmployee);
    setName('');
    setEmail('');
    setDepartment('');
    setDesignation('');
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Select Department</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
      </select>
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
