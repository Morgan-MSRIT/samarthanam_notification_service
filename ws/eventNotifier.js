const Event = require("../models/event.models.js");
const mailSender = require("../utils/mailSender.js");
const User = require("../models/user.models.js");
const Tag = require("../models/tag.models.js");
const volunteerInviteTemplate = require("../mail/templates/prospectiveVolunteerEmailTemplate.js");

const sleep = async ms => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CS_HOST = process.env.CS_HOST || "http://localhost:5173";
const options = { fullDocument: "updateLookup" };
const pipeline = [];

exports.watchEvents = () => Event.watch(pipeline, options).on("change", async next => {
    switch (next.operationType) {
        case 'insert':
            const event = next.fullDocument;
            const tags = event.tags;
            const users = await User.find();
            const prospectiveVolunteers = new Set(); 
            for (const tag of tags) {
                for (const user of users) {
                    var hasTag = false;
                    for (const userTag of user.tags) {
                        const userTagSchema = await Tag.findOne({ _id: userTag });
                        const tagSchema = await Tag.findOne({ _id: tag });
                        if (userTagSchema.name == tagSchema.name && user.role == "volunteer") {
                            hasTag = true;
                            break;
                        } 
                    }
                    if (!hasTag) {
                        continue;
                    }
                    prospectiveVolunteers.add(user);
                }
            }

            for (const volunteer of prospectiveVolunteers) {
                const email = volunteer.email;
                const body = volunteerInviteTemplate(volunteer.name, event.name, `${CS_HOST}/event/${event._id}`);
                await mailSender(email, "Samarthanam Volunteering Opportunity!", body);
                await sleep(5000);
            }
            break;
    }
})
