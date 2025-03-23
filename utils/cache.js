const Volunteer = require("../models/volunteer.models.js");
const Task = require("../models/task.models.js");
const volunteerTasksAllocated = {};

exports.initializeCache = async () => {
    const volunteers = await Volunteer.find();

    for (const volunteer of volunteers) {
        for (const allocatedTask of volunteer.taskAllocated) {
            const taskSchema = await Task.findOne({ _id: allocatedTask });
            if (volunteerTasksAllocated[volunteer._id] === undefined) {
                volunteerTasksAllocated[volunteer._id] = [];
            }
            volunteerTasksAllocated[volunteer._id].push(taskSchema);
        }
    }
    console.log(volunteerTasksAllocated);
}

exports.getTaskAllocatedForVolunteer = volunteer => {
    return volunteerTasksAllocated[volunteer._id];
}

exports.putTaskAllocatedForVolunteer = (volunteer, taskAllocated) => {
    volunteerTasksAllocated[volunteer._id] = taskAllocated;
    console.log("New task allocated for user.");
    console.log(volunteerTasksAllocated);
}
