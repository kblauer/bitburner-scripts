import { NS } from '@ns'
import hackSelf from 'src/hack/remote/hackSelf'
import hackRemote from 'src/hack/remote/hackRemote'

export default function remoteHackFactory(ns : NS) : void {
  // Uploads and runs hack scripts on remote servers

  const serversToHack = ns.scan("home")

  // filter the list to servers we can actually hack
  const filteredServers = serversToHack.filter((server) => {
    return ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()
  })

  for (const server of filteredServers) {
    hackServer(ns, server, ns.getHostname())
  }
}

function hackServer(ns: NS, hostname: string, parent: string) : void {
  ns.tprint(`hackServer running with args (ns, ${hostname}, ${parent})`)
  // get list of connected hosts to this server
  const serverScan = ns.scan(hostname)

  // remove home from the list
  const noHomeScan = serverScan.filter((server) => {
    return server !== "home"
  })
  ns.tprint(`Scan list for ${hostname}: `, noHomeScan)

  // filter the list to servers we can actually hack
  const hackableServers = noHomeScan.filter((server) => {
    return ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()
  })

  // remove any server which has 0 money - !!this removes servers from the call stack!!
  const moneyServers = hackableServers.filter((server) => {
    return ns.getServerMaxMoney(server) > 0
  })

  // if there is nothing remaining in the list, hack yourself
  if (hackableServers.length == 0) {
    hackSelf(ns, hostname)
  }

  // otherwise, hack all servers in list
  else {
    const numServerDivis = ns.getScriptRam("/src/hack/payload/hackPayload.js") * moneyServers.length
    let numOutgoingThreads = Math.floor(ns.getServerMaxRam(hostname) / numServerDivis)
    if (numOutgoingThreads < 1) numOutgoingThreads = 1

    for (const server of hackableServers) {
      // if there are no servers that have money, hack yourself
      if (moneyServers.length === 0) {
        hackSelf(ns, hostname)
      } else {
        hackRemote(ns, hostname, server, numOutgoingThreads)
      }

      // exit condition check
      if (server !== parent) {
        ns.tprint(`Recursively calling hackServer(ns, ${server}, ${hostname})`)
        hackServer(ns, server, hostname)
      } else {
        ns.tprint(`Exit condition, only parent connection remaining to ${server}`)
      }
    }
  }
}