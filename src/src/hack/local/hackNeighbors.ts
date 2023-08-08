import { NS } from '@ns'

export default function hackNeighbors(ns : NS) : void {
  // Starts scripts locally to hack the direct neighbors of our local machine.
  // TERMINATES THE CURRENT SCRIPT

  const serversToHack = ns.scan("home")

  // filter the list to servers we can actually hack
  const filteredServers = serversToHack.filter((server) => {
    return ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()
  })

  const scriptPath = "/src/hack/payload/hackPayload.js"
  const localMaxRam = ns.getServerMaxRam("home") - 6  // remove 6GB to account for the watcher script
  const localThreadDivis = ns.getScriptRam(scriptPath) * filteredServers.length
  const localNumThreads = Math.floor(localMaxRam / localThreadDivis)

  for (const [i, server] of filteredServers.entries()) {
    
    if (i != filteredServers.length-1) {
      ns.tprint(`Hacking ${server} locally`)
      ns.run(scriptPath, localNumThreads, server)
    } else {  // last server to hack
      ns.tprint(`Spawning last local hack for ${server}`)
      ns.tprint("-- Done starting local hacks --")
      ns.tprint("**** DONE ****")
      ns.spawn(scriptPath, localNumThreads, server)  // kills the script
      // UNREACHABLE
    }
  }
}