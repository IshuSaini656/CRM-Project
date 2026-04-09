import cluster from "cluster"
import os from "os"
import { startServer } from "./server.js"

const totalCPUs = os.cpus().length

if (cluster.isPrimary) {


    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker) => {
        cluster.fork()
    })

} else {

    startServer()

}