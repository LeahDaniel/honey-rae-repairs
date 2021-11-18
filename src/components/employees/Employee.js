import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOneEmployee } from "../ApiManager"

export const Employee = () => {
    const [employee, setEmployee] = useState({})  // State variable for current employee object
    const { employeeId } = useParams()  // Variable storing the route parameter

    useEffect(
        () => {
            getOneEmployee(employeeId)
                .then(setEmployee)
        },
        [ employeeId ]  // Above function runs when the value of employeeId change
    )


    return (
        <>
            <section className="employee">
                <h3 className="employee__name">{employee.name}</h3>
                <div className="employee__specialty">Specialty is {employee.specialty}</div>
            </section>
        </>
    )
}
