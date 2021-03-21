import { ChatRoom } from "../../../model/chatRoomSchema"
import { ContactsUtils } from "./contactsUtils"

export class ContactsController {
    private contactsUtils: ContactsUtils = new ContactsUtils()
    private chatRoom = new ChatRoom()
    public getContacts = async (req, res) => {
        const data = await this.contactsUtils.getContacts(res.locals._user)
        return res.status(200).json({messge: "Done", data})
    }
    public getContactById = async (req, res) => {        
        const userIds = [res.locals._user._id, req.params.id]
        const chatroomResult = await this.chatRoom.getAvailableRoom(userIds);
        
        const data: any = await this.contactsUtils.getContactById(req.params.id)
        data.chatRoomId = chatroomResult.chatRoomId
        // console.log('data', chatroomResult);
        // console.log('chatroomResult',data);
        return res.status(200).json({messge: "Done", data, chatRoomId: chatroomResult.chatRoomId })
    }
}