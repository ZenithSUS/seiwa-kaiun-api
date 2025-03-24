import {
  addActivity,
  getActivities as fetchActivities,
  getActivity
} from "../appwrite/activities.js";
// Create a new activity
export const createActivity = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({
        message: "Unprocessable Entity",
      });
    }

    await addActivity(req.body);
    return res.status(200).json({
        status: res.statusCode,
        message: "Created Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Get all activities
export const getActivities = async (req, res) => {
  try {
    const department = req.params.department;

    const activities = await fetchActivities(department);

    if (department) {
      return res
        .status(200)
        .json(activities.filter((d) => d.department === department));
    } else {
      return res.status(200).json(activities);
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Get activity by id
export const getActivityById = async (req, res) => {
  try {
    const ID = req.params.id;
    const activity = await getActivity(ID);

    if (!activity) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Activity not found",
      });
    } else {
      return res.status(200).json(activity);
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
