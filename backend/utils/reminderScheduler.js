import cron from "node-cron";
import Task from "../models/Task.js";

export default function startReminderScheduler() {
  console.log("⏳ Reminder Scheduler Running...");

  cron.schedule("* * * * *", async () => {
    const now = new Date();

    // find tasks where reminder time has passed and not yet sent
    const tasks = await Task.find({
      reminderAt: { $lte: now },
      isReminderSent: false
    });

    for (let task of tasks) {
      console.log(`🔔 Reminder: ${task.title} at ${task.reminderAt}`);

      // Here you can send:
      // - Email
      // - SMS
      // - Notification service
      // For now, we log it.

      task.isReminderSent = true;
      await task.save();
    }
  });
}
