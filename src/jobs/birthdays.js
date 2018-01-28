import { CronJob } from "cron";

const job = new CronJob(
  "00 00 00 * * *",
  () => {
    // TODO: Send notification when friend's birthday is close (two weeks?)
    // TODO: Add Todo entry "Buy present"
  },
  () => {
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */,
  "America/Los_Angeles" /* Time zone of this job. */
);

export default job;
