import {
  successAsync,
  notFoundAsync,
  success,
  notFound,
} from "../../services/response/";

import { sign } from "../../services/jwt";
import database from "../../database/models"; // In case of using pagination, model importation needs to be like this

export class UserController {
  index({ options }, res, next) {
    database.Users.paginate(options)
      .then((users) => {
        users.docs.forEach((user) => {
          user.password = null;
        });
        successAsync(res, 200, users);
      })
      .catch(next);
  }

  indexOne({ params: { id } }, res, next) {
    database.Users.findByPk(id)
      .then((user) => {
        user.password = null;
        successAsync(res, 200, user);
      })
      .catch(next);
  }

  upsert({ body }, res, next) {
    database.Users.upsert(body).then(() => successAsync(res, 200));
  }

  async auth({ body }, res, next) {
    console.log(body);

    if (!body.password) {
      res.json({ message: "Missing password", status: 400 });
    }
    if (!body.email) {
      res.json({ message: "Missing email", status: 400 });
    }
    const user = await database.Users.findOne({
      where: { email: body.email, password: body.password },
      //   include: [
      //     { model: database.Contacts, include: [{ model: database.PhoneInfos }] },
      //   ], // Inner join
    });

    if (user) {
      sign(user.id).then((token) => {
        successAsync(res, 200, { token, ...user.dataValues });
      });
    } else {
      res.json({ message: "Wrong login", status: 401 });
    }
  }

  show({ params }, res, next) {
    database.Users.findByPk(params.id)
      .then((user) =>
        user ? successAsync(res, 200, view(user)) : notFoundAsync(res)
      )
      .catch(next);
  }

  showMe({ user }, res) {
    successAsync(res, 200, view(user, true));
  }

  create({ body }, res, next) {
    delete body.access_token; //Remove token from response

    database.Users.findAll({ where: { email: body.email } })
      .then((userAlreadyExists) => {
        if (userAlreadyExists.length > 0) {
          res.json({
            valid: false,
            param: "email",
            message: "Email already registered",
            status: 409,
          });
        } else {
          database.Users.create(body)
            .then((created) => {
              sign(created.dataValues.id).then((token) => {
                successAsync(res, 201, token);
              });
            })
            .catch((err) => {
              res.json({
                valid: false,
                param: err.errors[0].path,
                message: err.errors[0].message,
                status: 406,
              });
            });
        }
      })
      .catch(next);
  }

  update = ({ body, params, user }, res, next) => {
    database.Users.findByPk(params.id === "me" ? user.id : params.id)
      .then((result) => {
        if (!result) {
          notFoundAsync(res);
        } else {
          const isAdmin = user.role === "admin";
          const isSelfUpdate = user.id === result.id;
          if (!isSelfUpdate && !isAdmin) {
            res.status(401).json({
              valid: false,
              message: "You can't change other user's data",
            });
            return null;
          } else {
            let newValue = result;
            newValue.name = body.name ? body.name : result.name;
            newValue.picture = body.picture ? body.picture : result.picture;

            console.log(newValue);
            database.Users.update(
              { name: newValue.name, picture: newValue.picture },
              { where: { id: result.id } }
            ).then(successAsync(res, 200, newValue));
          }
        }
      })
      .catch(next);
  };

  updatePassword = ({ body, params, user }, res, next) => {
    database.Users.findByPk(params.id === "me" ? user.id : params.id)
      .then(notFound(res))
      .then((result) => {
        if (!result) return null;
        const isSelfUpdate = user.id === result.id;
        if (!isSelfUpdate) {
          res.status(401).json({
            valid: false,
            param: "password",
            message: "You can't change other user's password",
          });
          return null;
        }
        if (!body.password) {
          res.status(400).json({
            valid: false,
            param: "password",
            message: "You should send a password on body",
          });
        }
        return result;
      })
      .then((result) => {
        database.Users.update(
          { password: body.password },
          { where: { id: result.id } }
        ).then(successAsync(res, 200, result));
      })

      .catch(next);
  };

  destroy({ params }, res, next) {
    database.Users.findOne({ where: { id: params.id } })
      .then((hasUser) => {
        const response = hasUser;
        if (!!hasUser) {
          console.log("Can be deleted");
          database.Users.destroy({
            where: { id: params.id },
          }).then(successAsync(res, 204, response));
        } else {
          notFoundAsync(res);
        }
      })
      .catch(next);
  }
}

export default new UserController();
