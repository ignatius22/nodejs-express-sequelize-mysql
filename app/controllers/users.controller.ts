import { Request, Response, } from "express";
const db = require("../models");
const User = db.User;
const Group = db.Group;



const create = (req: Request, res: Response) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthDate: req.body.birthDate
  };

  User.create(user)
    .then((data: any) => {
      res.json(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

const findAll = (req: Request, res: Response) => {

  User.findAll({
    include: [
      {
        model: Group,
        as: "groups",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data: any) => {
      res.json(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: [
      {
        model: Group,
        as: "groups",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data: any) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

const update = (req: Request, res: Response) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

export default {
  delete: deleteUser,
  update,
  findOne,
  findAll,
  create
}