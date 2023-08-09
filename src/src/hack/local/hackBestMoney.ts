import { NS } from '@ns'
import { getHackableServers } from 'src/common/serverFilters'
import hackRemote from 'src/hack/remote/hackRemote'

export default function hackBestMoney(ns : NS) : void {
  // Starts scripts on any owned servers that will hack the servers which offer the best payout.

  // This list is manual for now, to automate this we'd have to figure out some pattern in the servers.
  // n00dles, the first server you can hack, offers more $/s than many other servers.  It isn't just 
  // the server's max money, security level, or hack strength.  
  const bestServers = [
    "n00dles",
    "phantasy",
    "zer0",
    "max-hardware",
    "silver-helix",
    "omega-net"
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