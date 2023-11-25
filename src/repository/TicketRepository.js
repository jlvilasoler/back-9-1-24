import ticketModel from "../dao/models/ticket.model.js";


export default class TicketRepository {

    // GET ALL _ funciona
    async getTicketRepository() {
        try {
            const ticket = await ticketModel.find().lean();
            return ticket;
        } catch (error) {
            console.error("error getting tickets", error);
            throw error;
        }
    }

    // FILTER BY ID _ funciona
    async getTicketIdRepository(tid) {
        try {
            const ticket = await ticketModel.findOne(tid).lean();
            return ticket;
        } catch (error) {
            console.error("error filtering product", error);
            throw error;
        }
    }

    //ADD TICKET - ver
    async postTicketRepository(newTicket) {
        try {
          const ticket = new ticketModel(newTicket);
          const ticketCreate = await ticket.save();
          return ticketCreate;
        } catch (error) {
          console.error("Error adding ticket to the database:", error);
          throw error;
        }
      }}