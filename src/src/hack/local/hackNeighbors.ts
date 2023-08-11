import { NS } from '@ns'
import { getHackableServers } from 'src/common/serverFilters'

export default function hackNeighbors(ns : NS, reservedHomeRam : number) : void {
  // Starts scripts locally to hack the direct neighbors of our local machine.
  // TERMINATES THE CURRENT SCRIPT

  const serversToHack = ns.scan("home")

  // filter the list to servers we can actually hack
  const hackableServers = getHackableServers(ns, serversToHack)

  const scriptPath = "/src/hack/payload/hackPayload.js"
  const localMaxRam = ns.getServerMaxRam("home") - reservedHomeRam  // reserve to account for the watcher and controller on home
  const localThreadDivis = ns.getScriptRam(scriptPath) * hackableServers.length
  const localNumThreads = Math.floor(localMaxRam / localThreadDivis)

  for (const [i, server] of hackableServers.entries()) {
    const serverMaxMoney = ns.getServerMaxMoney(server)
    const serverMinSecurityLevel = ns.getServerMinSecurityLevel(server)
    if (i != hackableServers.length-1) {
      ns.tprint(`Hacking ${server} locally`)
      ns.run(scriptPath, localNumThreads, server, serverMaxMoney, serverMinSecurityLevel)
    } else {  // last server to hack
      ns.tprint(`Spawning last local hack for ${server}`)
      ns.tprint("-- Done starting local hacks --")
      ns.tprint("**** DONE ****")
      ns.spawn(scriptPath, localNumThreads, server, serverMaxMoney, serverMinSecurityLevel)  // kills the script
      // UNREACHABLE
    }
  }
}