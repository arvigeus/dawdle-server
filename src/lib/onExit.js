const queue = [];

const runQueue = () => {
  for (const item of queue) item();
};

process.once("SIGINT", () => {
  runQueue();
  process.exit();
});

process.once("SIGUSR2", () => {
  runQueue();
  process.kill(process.pid, "SIGUSR2");
});

export default handler => {
  queue.push(handler);
};
