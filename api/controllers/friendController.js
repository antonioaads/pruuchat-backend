import {
    successAsync,
    notFoundAsync,
    success,
    notFound,
  } from "../../services/response";
  
  import database from "../../database/models"; // In case of using pagination, model importation needs to be like this
  
  export class FriendController {
    index({ userId, options }, res, next) {
      database.Users.paginate(options)
        .then((users) => {
          users.docs.forEach((user) => {
            user.password = null;
          });
          users.docs.splice(users.docs.findIndex(u => u.id === userId), 1);
          successAsync(res, 200, users);
        })
        .catch(next);
    }
  }
  
  export default new FriendController();
  