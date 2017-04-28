import { Request, Response, NextFunction } from 'express'
import { AbstractRouter } from './abstract/abstract.router'
import { Skill } from '../schema/skill.schema';
import * as passport from 'passport'


class SkillRoute extends AbstractRouter {

    constructor() {
        super("/api/skill")
        this.init()
    }

    public insert(req: Request, res: Response, next: NextFunction) {
        var skill = new Skill(req.body)
        skill.save((err, docs) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(200).json(docs)
            }
        })
    }

    public insertMany(req: Request, res: Response, next: NextFunction) {
        var result = []
        req.body.forEach(sk => {
            var skill = new Skill(sk)
            skill.save((err, docs) => {
                if (err) {
                    console.log(err)
                } else {
                    result.push(docs)
                }
            })
        });
        res.status(200).json(result)
    }

    public findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
        Skill.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).send(err)
                throw err
            }
        })
    }

    public findById(req: Request, res: Response, next: NextFunction) {
        Skill.findById(req.params.id, function (err, docs) {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).send(err)
                throw err
            }
        })
    }

    public findAll(req: Request, res: Response, next: NextFunction) {
        Skill.find().sort({name: 1}).exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).send(err)
                throw err
            }
        })
    }

    public find(req: Request, res: Response, next: NextFunction) {
        Skill.find({name: new RegExp(req.body.name, 'gi')}).sort({name: 1}).exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).send(err)
                throw err
            }
        })
    }

    public delete(req, res, next) {
        Skill.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err)
                throw err
            } else {
                res.send("Skill was deleted")
            }
        })

    }

    init() {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete)
        this.router.post("/find", passport.authenticate('jwt'), this.find)
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll)
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById)
        this.router.post("/insert", passport.authenticate('jwt'), this.insert)
        this.router.post("/insertMany", passport.authenticate('jwt'), this.insertMany)
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate)
        super.beUsed()
    }
}

export default new SkillRoute().router