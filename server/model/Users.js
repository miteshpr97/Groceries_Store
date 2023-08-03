import mongoose from "mongoose"; 
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const UsersSchema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, required: true},
    hash_password: {type: String, required: true},
    role: {type: String, enum: ['USER', 'ADMIN'], default: "USER"},
    phone: {type: String},
    wishlist: {type: Array}
});


UsersSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.hash_password);
    },
  };

const Users = mongoose.model('Users', UsersSchema);
export default Users;