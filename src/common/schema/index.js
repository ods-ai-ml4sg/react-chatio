import {schema} from "normalizr";

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.name.toLowerCase()
});

const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
};

export default Schemas;