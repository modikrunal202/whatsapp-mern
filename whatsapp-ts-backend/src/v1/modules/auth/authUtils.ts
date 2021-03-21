import { IUserSchema, User } from "../../../model/users"
export class AuthUtils {
    public addUser = async (user: IUserSchema) => {
        try {
            const result = await User.create(user);
            console.log('result', result);
            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    public isUserExists = async (user: any) => {
        const result = await User.findOne({ email: user.email });
        return result;
    }
    public async generateLoginPayload (userInfo, token) {
        return {
            _id: userInfo._id,
            email: userInfo.email,
            name: userInfo.name,
            token,
        };
    }
}