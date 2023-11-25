import errorHandler from "../../middlewares/errorHandler.js";
import ticketModel from "../models/ticket.model.js";


export default class TicketsManager {

    // GET ALL _ funciona
    async getProducts() {
        try {
            const tickets = await ticketModel.find({}).lean();
            if (tickets) {
                res.send(tickets)
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send("error getting products");
            next(error)
        }
    }

    //FILTER BY ID _ funciona
    async getTicketById(tid) {
        try {
            const ticket = await ticketModel.findById(tid);
            if (ticket) {
                res.send(ticket)
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).send("error filtering ticket");
            next(error)
        }
    }


        //Add Cart - ver
        async addTicket(tid) {
            try {
                const newTicket = await ticketModel.create(tid);
                return newTicket.tid;
            } catch (error) {
                errorHandler();
            }
        }

}