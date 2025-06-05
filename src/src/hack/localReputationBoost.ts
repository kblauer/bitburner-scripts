import { NS } from '@ns'

export default function localReputationBoost(ns : NS, reservedHomeRam: number) : void {
  // use all available home RAM to boost reputation for current faction every 10s
  const scriptPath = "/src/hack/payload/reputationPayload.js"
  const availableRam = ns.getServerMaxRam('home') - reservedHomeRam
  const threadDivis = ns.getScriptRam(scriptPath)
  const numThreads = Math.floor(availableRam / threadDivis)

  const purchasedServers = ns.getPurchasedServers()
  for (const ownedServer of purchasedServers) {
    const numThreadsOwned = Math.floor(ns.getServerMaxRam(ownedServer) / threadDivis)
    ns.scp("/src/hack/payload/reputationPayload.js", ownedServer)
    ns.exec("/src/hack/payload/reputationPayload.js", ownedServer, numThreadsOwned)
  }

  ns.tprint('spawning ', scriptPath, ' with ', numThreads)
  ns.tprint("**** END HACKS- ****")
  ns.spawn(scriptPath, numThreads)
}
