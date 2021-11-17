import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom";
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

    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })
        .then( () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    changeTicket(data)
                })
            })
    }

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
                            <button onClick={() => { deleteTicket(ticket.id)}}> Delete</button>
                        </div>
                    </div>

                }
            )
            }
        </>
    )
}

//1. Tried fetching tickets again- fetched them but didn't re-render
//2. Tried wrapping tickets map in a useEffect- didn't render any tickets at all
//3. Tried calling whole TicketList function in a useEffect- useEffect cannot be at top level
//4. Tried wrapping whole JSX portion in a function then calling that in a useEffect, couldn't access the funtion before initialization
//5. Tried wrapping a useEffect around the whole JSX function, many errors resulted
//6. Tried invoking TicketList in deleteTicket, many errors resulted
//7. Tried to do "history.push("/tickets") in a few different places- seemingly did nothing
//8. Tried doing some nonsense on the ApplicationViews module