const Volunteer = require("../models/volunteer.models.js");
const Task = require("../models/task.models.js");
const User = require("../models/user.models.js");
const { broadcastMessage } = require("./wsServer.js");
const { putTaskAllocatedForVolunteer, getTaskAllocatedForVolunteer } = require("../utils/cache.js");

const options = { fullDocument: "updateLookup" };
const pipeline = [];

exports.watchVolunteers = () => {
    Volunteer.watch(pipeline, options).on("change", async next => {
        var volunteer;
        switch (next.operationType) {
            case "insert":
                volunteer = next.fullDocument;
                const taskAllocated = [];
                for (const allocatedTask of volunteer.taskAllocated) {
                    const taskSchema = await Task.findOne({ _id: allocatedTask });
                    taskAllocated.push(taskSchema);
                }
                putTaskAllocatedForVolunteer(volunteer, taskAllocated);
                break;
            case "update":
                volunteer = await User.findOne({ _id: next.fullDocument.user });
                const previousTaskAllocated = getTaskAllocatedForVolunteer(next.fullDocument);
                const newTaskAllocated = [];
                for (const allocatedTask of next.fullDocument.taskAllocated) {
                    const taskSchema = await Task.findOne({ _id: allocatedTask });
                    newTaskAllocated.push(taskSchema);
                }
                
                const newlyAllocatedTasks = [];
                const removedTasks = [];

                // Check for newly allocated tasks.
                for (const newTask of newTaskAllocated) {
                    var hasTask = false;
                    if (previousTaskAllocated !== undefined) {
                        for (const previousTask of previousTaskAllocated) {
                            if (previousTask._id.toString() === newTask._id.toString()) {
                                hasTask = true;
                                break;
                            }
                        }
                    }
                    if (hasTask) {
                        continue;
                    }
                    newlyAllocatedTasks.push(newTask);
                }

                // Check for removed tasks.
                if (previousTaskAllocated !== undefined) {
                    for (const previousTask of previousTaskAllocated) {
                        var hasTask = false;
                        for (const newTask of newTaskAllocated) {
                            if (newTask._id.toString() === previousTask._id.toString()) {
                                hasTask = true;
                                break;
                            }
                        }
                        if (hasTask) {
                            continue;
                        }
                        removedTasks.push(previousTask);
                    }
                }
                broadcastMessage(JSON.stringify({ volunteer: volunteer, newlyAllocatedTasks: newlyAllocatedTasks, removedTasks: removedTasks }));
                putTaskAllocatedForVolunteer(next.fullDocument, newTaskAllocated);
                break;
        }
    });
}
