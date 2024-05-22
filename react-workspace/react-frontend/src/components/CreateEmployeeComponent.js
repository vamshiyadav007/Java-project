import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

function CreateEmployeeComponent() {

    const [employee,setEmployee]=useState({
        firstName:"",
        lastName:"",
        email:"",
        number:"",
        salary:""
    }) 

    let navigate=useNavigate();

    const handleClick=(e)=>
    {
        const name=e.target.name;
        const value=e.target.value;
        setEmployee({...employee,[name]:value})
    }

    const cancelHandle=()=>
    {
        navigate('/employees');
    }

    const saveHandler=(e)=>
    {
          e.preventDefault();
          console.log("employee => "+JSON.stringify(employee));

          EmployeeService.createEmployee(employee).then(res=>
            {
              navigate('/employees');
            })
    
    
    }

  return (
    <div className='container mt-3 '>
        <div className='row'>
             <div className='card col-md-6 offset-md-3'>
             <h2 className='text-center'>Add Employee</h2>
             <div className='card-body'>
                <form> 
                <div className='form-group my-3 '>
                   <label className='my-2'>First Name:</label>
                   <input type="text" name="firstName" className='form-control' placeholder='FirstName' required
                    value={employee.firstName}
                     onChange={handleClick}/> 
                </div>

                <div className='form-group my-3'>
                   <label className='my-2'>Last Name:</label>
                   <input type="text" name="lastName" className='form-control' placeholder='LastName'
                    value={employee.lastName}
                    onChange={handleClick}/> 
                </div>

                <div className='form-group my-3'>
                   <label className='my-2'>Email:</label>
                   <input type="text" name="email" className='form-control' placeholder='Email'
                    value={employee.email}
                    onChange={handleClick}/> 
                </div>
                
                <div className='form-group my-3'>
                   <label className='my-2'>Mobile Number:</label>
                   <input type="text" name="number" className='form-control' placeholder='Mobile Number'
                    value={employee.number}
                    onChange={handleClick}/> 
                </div>
                
                <div className='form-group my-3'>
                   <label className='my-2'>Salary:</label>
                   <input type="text" name="salary" className='form-control' placeholder='Salary'
                    value={employee.salary}
                    onChange={handleClick}/> 
                </div>
                  
                  <button  type='submit' className='btn btn-success'onClick={saveHandler}>Save</button>
                  <button className='btn btn-danger' style={{marginLeft:"10px"}}
                  onClick={cancelHandle}>Cancel</button>
             </form>
             </div>


             </div>
        </div>
            
    </div>
  )
}

export default CreateEmployeeComponent