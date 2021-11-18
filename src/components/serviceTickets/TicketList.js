import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom";
import { deleteTicket, getAllTickets } from "../ApiManager";
import "./Tickets.css";



export const TicketList = () => {
    const [tickets, changeTicket] = useState([])
    const [active, setActive] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            getAllTickets()
                .then(changeTicket)
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
            {tickets.map(
                (ticket) => {
                    return <div key={`ticket--${ticket.id}`}>
                        <div className={ticket.emergency ? "emergency" : "ticket"}>
                            <p>
                                {ticket.emergency ? "🚑" : ""}
                                <Link to={`/tickets/${ticket.id}`}>{ticket.description}</Link>
                            </p>
                            <p>Submitted by {ticket.customer.name} and worked on by {ticket.employee.name}</p>
                            <button onClick={() => { 
                                deleteTicket(ticket.id)
                                    .then(() => getAllTickets())
                                    .then(changeTicket)
                            }}> Delete</button>
                        </div>
                    </div>

                }
            )
            }
        </>
    )
}