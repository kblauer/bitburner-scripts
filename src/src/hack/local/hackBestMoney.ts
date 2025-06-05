import { NS } from '@ns'
import { getHackableServers } from 'src/common/serverFilters'
import hackRemote from 'src/hack/remote/hackRemote'

export default function hackBestMoney(ns : NS) : void {
  // Starts scripts on any owned servers that will hack the servers which offer the best payout.

  // High hack skill requirement servers that tend to have 0 RAM
  const highServers = [
    "ecorp",              // 1291
    "nwo",                 // 1075
    "megacorp",            // 1246
    "stormtech",           // 1002
    "blade",               // 1042
    "kuai-gong",           // 1053
    "powerhouse-fitness",  // 1035
    "fulcrumassets"       // 1102
  ]

  const bestServers = [
    "n00dles",
    "phantasy",
    "zer0",
    "max-hardware",
    "silver-helix",
    "omega-net",
    "foodnstuff",
    "joesguns"
  ]

  const hackableServers = getHackableServers(ns, bestServers)

  // for each purchased server, run the remote hack for each of the best list
  const purchasedServers = ns.getPurchasedServers()

  for (const ownedServer of purchasedServers) {

    // calculate the number of threads for this server
    const threadDivis = ns.getScriptRam("/src/hack/payload/hackPayload.js") * hackableServers.length
    const numThreads = Math.floor(ns.getServerMaxRam(ownedServer) / threadDivis)

    for (const hackTarget of hackableServers) {
      hackRemote(ns, ownedServer, hackTarget, numThreads)
    }
  }
}