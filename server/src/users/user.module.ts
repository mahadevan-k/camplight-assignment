import UserController from './user.controller.ts';
import UserService from './user.service.ts';
import UserRouter from './user.router.ts';

const userService = new UserService();
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export default {
  service: userService,
  controller: userController,
  router: userRouter.getRouter()
};
