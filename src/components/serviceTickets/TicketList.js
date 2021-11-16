import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import "./Tickets.css";

export const TicketList = () => {
    const [tickets, changeTicket] = useState([])
    const [active, setActive] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    changeTicket(data)
                })
        },
        []
    )

    useEffect(
        () => {
            const activeTicketCount = tickets.filter(ticket => ticket.dateCompleted === "").length
            setActive(`There are ${activeTicketCount} open tickets`)
        },
        [tickets]
    )

    return (
        <>
            <div>
                <button onClick={() => history.push("/tickets/create")}> Create Ticket</button>
            </div>

            <p>{active}</p>
            {
                tickets.map(
                    (ticket) => {
                        return <div key={`ticket--${ticket.id}`}>
                            <div className={ticket.emergency ? "emergency" : "ticket"}>
                                <p>{ticket.emergency ? "🚑" : ""} {ticket.description}</p>
                                <p>Submitted by {ticket.customer.name} and worked on by {ticket.employee.name}</p>
                            </div>
                        </div>
                    }
                )
            }
        </>
    )
}