
export const getAllCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(res => res.json())
}
export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees`)
        .then(res => res.json())
}
export const getAllTickets = () => {
    return fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
        .then(res => res.json())
}

export const getOneEmployee = (id) => {
    return fetch(`http://localhost:8088/employees/${id}`)
        .then(res => res.json())
}
export const getOneTicket = (id) => {
    return fetch(`http://localhost:8088/serviceTickets/${id}?_expand=customer&_expand=employee`)
        .then(response => response.json())
}

export const postEmployee = (newEmployee) => {
    return fetch("http://localhost:8088/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })
}
export const postTicket = (newTicket) => {
    return fetch("http://localhost:8088/serviceTickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTicket)
    })
}

export const putTicket = (ticketId, updatedTicket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTicket)
    })
}

export const deleteTicket = (id) => {
    return fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })
}