import { Router } from "express";

import { getAllController , getTicketByIdController, createTicketController, deleteTicketController } from "../src/Controllers/TicketController.js";




const router = Router();





// En la ruta GET, debe devolver los productos
router.get('/ticket', /*privateRoutes*/ getAllController);

// En la ruta GET, debe devolver los productos
router.get('/ticket/:tid', /*privateRoutes*/ getTicketByIdController);

// En la ruta POST, agregar ticket
router.post('/ticket', /*privateRoutes,*/ createTicketController);

// En la ruta DELETE, eliminar ticket
router.delete('/ticket/:tid', /*privateRoutes,*/ deleteTicketController);

export default router;