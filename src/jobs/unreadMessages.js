import { CronJob } from "cron";

const job = new CronJob(
  "00 00 00 * * *",
  () => {
    // TODO: Send notification when a message is not viewed for a 6? hours
  },
  () => {
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */,
  "America/Los_Angeles" /* Time zone of this job. */
);

export default job;
