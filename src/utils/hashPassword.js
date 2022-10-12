import bcrypt from "bcryptjs"

export const hashPassword = async (password) => {
    return bcrypt.hash(password, "$2a$10$zT2ytNLjkkdLEzzHhY3TfO");
}