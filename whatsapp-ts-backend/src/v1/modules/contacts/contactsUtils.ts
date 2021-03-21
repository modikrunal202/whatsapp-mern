import { User } from "../../../model/users";

export class ContactsUtils {
    public async getContacts(currentUser: any) {
        const getContacts = await User.find({_id: {$ne: currentUser._id}});
        return getContacts;
    }
    public async getContactById(id: string) {
        // console.log('calll here', id);
        const getContacts = await User.findOne({_id: id});
        return getContacts;
    }
}