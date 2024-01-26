import TicketManager from "../dao/database/ticketManager.js";
import TicketRepository from "../repository/TicketRepository.js";

const ticketRepository = new TicketRepository();
const TM = new TicketManager();


// GET ALL _ funciona
export const getAllTicketsService = async () => {
    try {
        const tickets = await ticketRepository.getTicketRepository();
        return tickets;
    } catch (error) {
        console.log(error);
    }
};

//FILTER BY ID _ funciona
export const getTicketByIdService = async (tid) => {
    try {
        const ticket = await ticketRepository.getTicketIdRepository({ _id: tid });
        return ticket;
    } catch (error) {
        console.log(error);
    }
};

//ADD TICKET - ver
export const addTicketService = async (purchaser, amount) => {
    const newTicket = {
      purchaser,
      amount,
    };
  
    try {
      const ticketCreate = await ticketRepository.postTicketRepository(newTicket);
      console.log(ticketCreate, "ticket added");
      return ticketCreate;
    } catch (error) {
      console.log("Error when adding ticket", error);
    }
  };


  //DELETE TICKET BY ID _ 
export const deleteTicketService = async (tid) => {
  try {
      const ticket = await ticketRepository.deleteRepository({ _id: tid });
      return ticket;
  } catch (error) {
      console.log(error);
  }
};