import UserController from './user.controller';
import express from 'express';

class UserRouter {
  userController: UserController;

  constructor(userController:UserController) {
    this.userController = userController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.userController.getUsers);
    router.route("/").post(this.userController.addUser);
    router.route("/:id").delete(this.userController.deleteUser);

    return router;
  }
}

export default UserRouter;
