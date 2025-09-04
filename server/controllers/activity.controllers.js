import Activity from "../models/activity.model";
const activityControllers = {};
//create activity
activityControllers.create = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    } = req.body;
    if (
      !name ||
      !type ||
      !level ||
      !team_size ||
      !date ||
      !location ||
      !reg_open ||
      !reg_close ||
      !contact_name ||
      !contact_phone ||
      !contact_email
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }
    //check if email is valid
    const exist = await Activity.findOne({ where: { contact_email } });
    if (exist) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const newActivity = {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    };
    const created = await Activity.create(newActivity);
    return res
      .status(201)
      .json({ message: "Activity created successfully!", activity: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// เพิ่ม get all activities
activityControllers.getAll = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    return res.status(200).json(activities);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// เพิ่ม get activity by id
activityControllers.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.status(200).json(activity);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// เพิ่ม update activity
activityControllers.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Activity.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Activity not found" });
    }
    const updatedActivity = await Activity.findByPk(id);
    return res
      .status(200)
      .json({ message: "Activity updated", activity: updatedActivity });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// เพิ่ม delete activity
activityControllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Activity.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.status(200).json({ message: "Activity deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

activityControllers.serchActivity = async (req, res) => {
    try{const { name ,type,level, status} = req.query;
    const whereClause = {};
    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (type) {
        whereClause.type = type;
    }
    if (level) {
        whereClause.level = level;
    }
    if (status) {
        whereClause.status = status;
    }
    const activities = await Activity.findAll({ where: whereClause });
    res.status(200).json(activities);
}catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default activityControllers;
