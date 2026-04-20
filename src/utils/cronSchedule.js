const Cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const connectionModel = require("../model/connectionRequest");
const { sendInterestedEmail } = require("../utils/EmailService");

// date-fns is give UTC time format

Cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const startofDays = startOfDay(yesterday);
    const endofDays = endOfDay(yesterday);
    const pendingRequest = await connectionModel
      .find({
        status: "interested",
        createdAt: {
          $gte: startofDays, // >= start of yesterday (00:00:00)
          $lte: endofDays, // <= end of yesterday   (23:59:59)
        },
      })
      .populate("receiverId senderId");
   const seen = new Set();
const data = pendingRequest.filter(val => {
   const email = val.receiverId.email;
   if (seen.has(email)) return false;
  seen.add(email);
  return true;
});
console.log(data);
for (let req of data) {
  await sendInterestedEmail(
    req.receiverId.email+ "",
    req.receiverId.firstName,
    req.senderId.firstName
   );
 }
  } catch (err) {
    console.log("something is wrong in cron schedule" + err);
  }
});

module.exports = Cron;
