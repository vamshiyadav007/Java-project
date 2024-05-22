import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link } from 'react-router-dom'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare , faTrash,faUserPlus} from '@fortawesome/free-solid-svg-icons'

export default class ListEmployeeComponent extends Component {

    constructor(props)
    {
        super()

        this.state={
            employees:[]
        }
    }

    componentDidMount()
    {
        EmployeeService.getEmployees().then ((res) =>
        {
            this.setState({employees:res.data})

        })
    }

    deleteEmployee=(employeeId)=>
    {
        EmployeeService.deleteEmployee(employeeId).then(res=>
            {
                EmployeeService.getEmployees().then((res)=>
                {
                    this.setState({employees:res.data})
                })
            }).catch(error=>
            {
                console.log(error);
            })
    }

  render() {
    return (
      <div>
        <h2 className='text-center mt-4'>EMPLOYEE LIST</h2>
        <div className='row'>
            <Link to="/add-employee" className='btn add my-5 '> Add Employee  <FontAwesomeIcon icon={faUserPlus} /></Link>
            <table className='datatable'>
                <thead>
                     <tr >
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Salary</th>
                        <th className='row mx-4'>Actions</th>
                     </tr>
                </thead>
                <tbody>
                    {
                        this.state.employees.map(
                            employee =>
                               <tr key={employee.id}>
                                  <td>{employee.id}</td>
                                  <td>{employee.firstName}</td>
                                  <td>{employee.lastName}</td>
                                  <td>{employee.email}</td>
                                  <td>{employee.number}</td>
                                  <td>{employee.salary}</td>
                                  <td>
                                    <Link to={`/update-employee/${employee.id}`}><FontAwesomeIcon className="update" icon={faPenToSquare} /></Link>
                                    <button
                                    onClick={()=>this.deleteEmployee(employee.id)}><FontAwesomeIcon className='delete' icon={faTrash} /></button>
                                  </td>
                               </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    )
  }
}