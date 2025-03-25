const Volunteer = require("../models/volunteer.models.js");
const Task = require("../models/task.models.js");
const User = require("../models/user.models.js");
const Notification = require("../models/notification.models.js");
const Event = require("../models/event.models.js");
const { putTaskAllocatedForVolunteer, getTaskAllocatedForVolunteer } = require("../utils/cache.js");
const mailSender = require("../utils/mailSender.js");
const taskAllocationTemplate = require("../mail/templates/taskAllocationEmailTemplate.js");

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
                for (const newlyAllocatedTask of newlyAllocatedTasks) {
                    await Notification.insertOne({ user: volunteer, type: 'allot', event: next.fullDocument.event, task: newlyAllocatedTask });
                }
                for (const removedTask of removedTasks) {
                    await Notification.insertOne({ user: volunteer, type: 'deallot', event: next.fullDocument.event, task: removedTask });
                }
                const event = await Event.findOne({ _id: next.fullDocument.event });
                await mailSender(volunteer.email, "Samarthanam Task Allocation Notification", taskAllocationTemplate(volunteer.name, newlyAllocatedTasks, removedTasks, event.name))
                putTaskAllocatedForVolunteer(next.fullDocument, newTaskAllocated);
                break;
        }
    });
}
