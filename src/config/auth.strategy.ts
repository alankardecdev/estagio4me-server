import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'

import { User } from '../schema/user.schema'

export class AuthStrategy extends Strategy {

    static defaultOptions: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: 'estagio4me secret',
        ignoreExpiration: true

    }

    constructor(options: StrategyOptions) {
        super(options, (payload, done) => {
            if (payload) {
                var user = new User(payload)
                return done(null, user)
            } else {
                return done(new Error("User not found"), null)
            }
        })
    }
}