

export const getAllUsers = async (req, res) => {
  try {
    const limit = req.query.limit;
    const users = [];

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
    const users = [];
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      res.status(404).json({
        status: res.statusCode,
        message: "User not found",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { firstName, middleName, lastName, department, email, password } =
    req.body;

  if (!firstName || !lastName || !department || !email || !password) {
    return res.status(401).json({
      status: res.statusCode,
      message: "All fields are required",
    });
  }

  try {
   
    const users = []

    if (users) {
      return res.status(200).json({
        status: res.statusCode,
        message: "User created successfully",
      });
    }
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
    const users = [];
    const user = users.find((doc) => doc.id === userId);

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
