import { Event } from "../models/event.models.js";
import mailSender from "../utils/mailSender.js";
import { User } from "../models/user.models.js";
import volunteerInviteTemplate from "../mail/templates/prospectiveVolunteerEmailTemplate.js";
import sleep from "../utils/sleep.js";

const CS_HOST = process.env.CS_HOST || "http://localhost:5173";

exports.watchEvents = () => Event.watch().on("change", async next => {
    switch (next.operationType) {
        case 'insert':
        case 'update':
            const event = next.fullDocument;
            const tags = event.tags;
            const users = await User.find();
            const prospectiveVolunteers = []; 
            for (const tag of tags) {
                for (const user of users) {
                    var hasTag = false;
                    for (const userTag of user.tags) {
                        if (userTag.name == tag.name && user.role == "volunteer") {
                            hasTag = true;
                            break;
                        } 
                    }
                    if (!hasTag) {
                        continue;
                    }
                    prospectiveVolunteers.push(user);
                }
            }

            for (const volunteer of prospectiveVolunteers) {
                const email = volunteer.email;
                const body = volunteerInviteTemplate(volunteer.name, event.name, `${CS_HOST}/register`, `${CS_HOST}/event/${event.id}`);
                await mailSender(email, "Samarthanam Volunteering Opportunity!", body);
                await sleep(5000);
            }
            break;
    }
})
