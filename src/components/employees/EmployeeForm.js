import React, { useState } from "react"
import { useHistory } from "react-router";
import { postEmployee } from "../ApiManager";

export const EmployeeForm = () => {
    const [employee, updateEmployee] = useState({
        enteredName: "",
        enteredSpecialty: ""
    });

    const history = useHistory()

    const hireEmployee = (event) => {
        event.preventDefault()

        const newEmployee = {
            name: employee.enteredName,
            specialty: employee.enteredSpecialty
        }

        postEmployee(newEmployee)
            .then(() => {
                history.push("/employees")
            })

    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.enteredName = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Technical Specialty"
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.enteredSpecialty = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={hireEmployee}>
                Finish Hiring
            </button>
        </form>
    )
}
