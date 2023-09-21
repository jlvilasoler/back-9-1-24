import { chatModel } from "../models/chat.model.js"

export default class ChatManager {
    async addMessage() {
        await chatModel.create(data);
        const mensajes = await chatModel.find().lean();
        console.log(mensajes);
    }
}
