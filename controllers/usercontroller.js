import {
  addUser,
  getUsers,
  getUser,
  updateUser as editUser,
} from "../appwrite/users.js";

export const getAllUsers = async (req, res) => {
  try {
    const limit = req.query.limit;
    const users = await getUsers();

    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(users.slice(0, limit));
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { firstName, middleName, lastName, department, email, password } = req.body;

  if (!firstName || !lastName || !department || !email) {
    return res.status(400).json({
      status: res.statusCode,
      message: "All fields are required",
    });
  }

  try {
    const name = `${firstName} ${middleName} ${lastName}`;
    await addUser({ email, firstName, lastName, middleName, department, name, password});
    

    return res.status(200).json({
      status: res.statusCode,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { firstName, middleName, lastName, department, email } = req.body;
  const id = req.params.id; 

  if (!firstName || !lastName || !department || !email) {
    return res.status(400).json({
      status: res.statusCode,
      message: "All fields are required",
    });
  }

  try {
    await editUser({ firstName, lastName, middleName, department, email }, id);

    return res.status(200).json({
      status: res.statusCode,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await getUser();


    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: "User not found",
      });
    }

    await deleteDoc(doc(db, "Users", userId));

    return res.status(200).json({
      status: res.statusCode,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
