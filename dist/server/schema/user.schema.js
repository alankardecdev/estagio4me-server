"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose_1 = require("mongoose");
const abstract_schema_1 = require("./abstract/abstract.schema");
class UserSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            _firstName: String,
            _lastName: String,
            _username: {
                type: String,
                unique: true
            },
            _email: {
                type: String,
                unique: true
            },
            _isAdmin: {
                type: Boolean,
                default: false
            }
        });
        this.plugin(passportLocalMongoose, {
            usernameLowerCase: true,
            usernameField: '_username',
            passwordField: '_password'
        });
    }
}
exports.UserSchema = UserSchema;
exports.User = mongoose_1.model("User", new UserSchema);
//# sourceMappingURL=user.schema.js.map