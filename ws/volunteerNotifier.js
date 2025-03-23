const Volunteer = require("../models/volunteer.models.js");
const Task = require("../models/task.models.js");
const User = require("../models/user.models.js");
const { putTaskAllocatedForVolunteer, getTaskAllocatedForVolunteer } = require("../utils/cache.js");

const options = { fullDocument: "updateLookup" };
const pipeline = [];

exports.watchVolunteers = ws => {
    Volunteer.watch(pipeline, options).on("change", async next => {
        switch (next.operationType) {
            case "insert":
                const volunteer = next.fullDocument;
                const taskAllocated = [];
                for (const allocatedTask of volunteer.taskAllocated) {
                    const taskSchema = await Task.findOne({ _id: allocatedTask });
                    taskAllocated.push(taskSchema);
                }
                putTaskAllocatedForVolunteer(volunteer, taskAllocated);
                break;
            case "update":
                if (next.updateDescription.updatedFields.taskAllocated !== undefined) {
                    const volunteer = await User.findOne({ _id: next.fullDocument.user });
                    const previousTaskAllocated = getTaskAllocatedForVolunteer(volunteer);
                    const newTaskAllocated = [];
                    for (const allocatedTask of next.updateDescription.updatedFields.taskAllocated) {
                        const taskSchema = await Task.findOne({ _id: allocatedTask });
                        newTaskAllocated.push(taskSchema);
                    }
                    
                    const newlyAllocatedTasks = [];
                    const removedTasks = [];

                    // Check for newly allocated tasks.
                    for (const newTask of newTaskAllocated) {
                        var hasTask = false;
                        for (const previousTask of previousTaskAllocated) {
                            if (previousTask._id === newTask._id) {
                                hasTask = true;
                                break;
                            }
                        }
                        if (hasTask) {
                            continue;
                        }
                        newlyAllocatedTasks.push(newTask);
                    }

                    // Check for removed tasks.
                    for (const previousTask of previousTaskAllocated) {
                        var hasTask = false;
                        for (const newTask of newTaskAllocated) {
                            if (newTask._id === previousTask._id) {
                                hasTask = true;
                                break;
                            }
                        }
                        if (hasTask) {
                            continue;
                        }
                        removedTasks.push(previousTask);
                    }

                    ws.send(JSON.stringify({ volunteer: volunteer, newlyAllocatedTasks: newlyAllocatedTasks, removedTasks: removedTasks }));
                }
                break;
        }
    });
}
