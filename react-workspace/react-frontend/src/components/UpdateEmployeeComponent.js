import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

function UpdateEmployeeComponent() {

    let navigate = useNavigate();

    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [number, setNumber] = useState(" ");
    const [salary, setSalary] = useState(" ");
    const { id } = useParams();

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
            setNumber(res.data.number);
            setSalary(res.data.salary);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const cancelHandle = () => {
        navigate('/employees');
    }

    const updateHandler = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, email, number, salary };

        if (id) {
            EmployeeService.updateEmployee(id, employee).then(res => {
                navigate('/employees');
            });
        }
        else {
            EmployeeService.createEmployee(employee).then(res => {
                console.log(res.data);
                navigate('/employees');
            })
        }
    }


    return (
        <div className='container mt-3 '>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'>Update Employee</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group my-3 '>
                                <label className='my-2'>First Name:</label>
                                <input type="text" name="firstName" className='form-control' placeholder='FirstName'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>

                            <div className='form-group my-3'>
                                <label className='my-2'>Last Name:</label>
                                <input type="text" name="lastName" className='form-control' placeholder='LastName'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>

                            <div className='form-group my-3'>
                                <label className='my-2'>Email:</label>
                                <input type="text" name="email" className='form-control' placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className='form-group my-3'>
                                <label className='my-2'>Mobile Number:</label>
                                <input type="text" name="number" className='form-control' placeholder='Mobile Number'
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)} />
                            </div>

                            <div className='form-group my-3'>
                                <label className='my-2'>Salary:</label>
                                <input type="text" name="salary" className='form-control' placeholder='Salary'
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)} />
                            </div>

                            <button className='btn btn-success' onClick={updateHandler}>Save</button>
                            <button className='btn btn-danger' style={{ marginLeft: "10px" }}
                                onClick={cancelHandle}>Cancel</button>
                        </form>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default UpdateEmployeeComponent