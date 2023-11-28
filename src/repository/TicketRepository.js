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

    //ADD TICKET
    async postTicketRepository(tid) {
        try {
            const addTicket = await ticketModel.create(tid);
            console.log(ticketModel)
            return addTicket;
        } catch (error) {
            throw error;
        }
    }


    //DELETE TICKEt BY ID _ ver
    async deleteRepository(tid) {
        try {
            const ticket = await ticketModel.deleteOne({ _id: tid });
            return ticket;
        } catch (error) {
            console.error("error deleting ticket", error);
            throw error;
        }
    }

}