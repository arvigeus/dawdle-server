import { CronJob } from "cron";

const job = new CronJob(
  "00 00 00 * * 6",
  () => {
    // TODO: the system will keep track of people you have not been in touch recently and try to push you into reconnecting.
    // Each new note, PM is considered interaction and resets timer
    // SELECT * FROM Friends where userId IS NOT NULL AND userId != createdBy and health < 50
  },
  () => {
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */,
  "America/Los_Angeles" /* Time zone of this job. */
);

export default job;
