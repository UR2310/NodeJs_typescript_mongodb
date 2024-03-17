import { InferSchemaType, model, Schema } from 'mongoose';

// export type userData = {
//     email: String;
//     password: String;
//     isVerified: Boolean;
//     accountAccessCode: String | undefined ;
//     passwordRecoveryCode : String | undefined;
//     isDeleted: Boolean;
// }

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isDeleted: { type: Boolean, required: true, default: false, select: false },
}, {
    timestamps: true
});

export type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);