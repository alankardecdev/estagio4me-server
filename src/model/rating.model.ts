import { IAbstractModel } from './abstract/abstract.model'
import { IInternshipModel } from './internship.model'
import { IUserModel } from "./user.model"

export interface IRatingModel extends IAbstractModel {
    _stars: Number
    _internship: IInternshipModel
    _user: IUserModel
}