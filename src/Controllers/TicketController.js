import ticketModel from "../dao/models/ticket.model.js";
import { getAllTicketsService, getTicketByIdService , addTicketService, deleteTicketService} from "../../src/Services/TicketServices.js";

// GET ALL _ funciona
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

// FILTER BY ID _ funciona
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

// CREA TICKET - ver
export const createTicketController = async (req, res, next) => {
    const { purchaser, amount } = req.body;
    try {
      const newTicket = await addTicketService( purchaser, amount);
      res.send(newTicket);
    } catch (error) {
      console.error("Error adding ticket:", error);
      res.status(500).send(`Error adding ticket: ${error.message}`);
      next(error);
    }
  };


  //DELETE TICKET BY ID - ver
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

