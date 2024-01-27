import ticketModel from "../dao/models/ticket.model.js";
import { getAllTicketsService, getTicketByIdService, addTicketService, deleteTicketService } from "../../src/Services/TicketServices.js";
import sendEmailInfo from "../Services/Checkoutmail.service.js";

// GET ALL
export const getAllController = async (req, res, next) => {
    try {
        const tickets = await getAllTicketsService();
        if (tickets) {
            res.send(tickets);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send("error getting tickets");
        next(error);
    }
};

// FILTER BY ID
export const getTicketByIdController = async (req, res, next) => {
    try {
        const { tid } = req.params;
        const ticket = await getTicketByIdService(tid);
        if (ticket) {
            res.send(ticket);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send("error filtering ticket");
        next(error);
    }
};

// CREA TICKET  
export const createTicketController = async (req, res, next) => {
    const { purchaser, amount } = req.body;
    try {
        const newTicket = await addTicketService(purchaser, amount);

        sendEmailInfo('jlvilasoler@hotmail.com', `${purchaser} Your payment of ${amount} has been successful! \n Thank you for choosing us always!`)
        console.log(sendEmailInfo)

        res.send(newTicket);
    } catch (error) {
        console.error("Error adding ticket:", error);
        res.status(500).send(`Error adding ticket: ${error.message}`);
        next(error);
    }
};


//DELETE TICKET BY ID 
export const deleteTicketController = async (req, res, next) => {
    try {
        const { tid } = req.params;
        const ticket = await deleteTicketService(tid);
        if (ticket) {
            res.send(ticket)
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send("error deleting ticket");
        next(error)
    }
}

