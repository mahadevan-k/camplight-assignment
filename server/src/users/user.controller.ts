import { Request, Response } from 'express';
import UserService, { UserData }  from './user.service';

class UserController {
  userService:UserService;

  constructor(userService:UserService) {
    this.userService = userService;
  }

  getUsers = async (req:Request, res:Response) => {
    const limit = "limit" in req.query ? Number(req.query.limit) : undefined;
    const offset = "offset" in req.query ? Number(req.query.offset) : undefined;
    const result = await this.userService.getUsers(limit,offset);
    return res.status(200).send(result)
  };

  addUser = async (req:Request, res:Response) => {
    const userData:UserData = { name: req.body.name, email: req.body.email, phone: req.body.phone }
    const result = await this.userService.addUser(userData);
    return "errors" in result ? res.status(400).send(result) : res.status(200).send(result)
  }

  deleteUser = async (req:Request, res:Response) => {
    const result = await this.userService.deleteUser(Number(req.params.id));
    return result ? res.status(404).send(result) : res.status(201).send();
  }
}

export default UserController
