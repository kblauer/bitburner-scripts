import { NS } from '@ns'
import nukeServer from 'src/common/nukeServer'

export default function hackSelf(ns : NS, hostname : string) : void {
  // Uploads the payload and execs a hack on the current host (myself)

  const numSelfThreads : number = Math.floor(ns.getServerMaxRam(hostname) / ns.getScriptRam("/src/hack/payload/hackPayload.js"))
  
  ns.tprint(`Server ${hostname} hacking itself...`)

  // Nuke the server, then hack it
  if (ns.hasRootAccess(hostname) == false) {
    ns.tprint(`Nuking server ${hostname}`)
    nukeServer(ns, hostname)
  }

  const serverMaxMoney = ns.getServerMaxMoney(hostname)
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(hostname)
  
  ns.scp("/src/hack/payload/hackPayload.js", hostname)
  ns.exec("/src/hack/payload/hackPayload.js", hostname, numSelfThreads, hostname, serverMaxMoney, serverMinSecurityLevel)

  ns.tprint(`${hostname} done hacking itself`)
}