const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isPrimary) {
  const workers = [];
  for (let i = 0; i <= numCPUs; i++) {
    const { id } = cluster.fork({
      WORKER_TYPE: i ? "CRON" : "MAIL_SERVICE",
    });
    workers.push({
      id: id,
      type: i ? "CRON" : "MAIL_SERVICE",
    });
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Proceess ${worker.id} died with code: ${code}`);
    workers.forEach((workerData, index) => {
      if (workerData["id"] === worker.id) {
        const { id } = cluster.fork({ WORKER_TYPE: workerData["type"] });
        workers.push({
          id: id,
          type: workerData["type"],
        });
        workers.splice(index, 1);
      }
    });
  });
} else {
  if (process.env["WORKER_TYPE"] === "CRON") {
    //start cron worker
  } else {
    //start mail worker
  }
}
