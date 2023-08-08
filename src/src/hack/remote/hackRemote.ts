import { NS } from '@ns'
import nukeServer from 'src/common/nukeServer'

export default function hackRemote(ns: NS, hostname: string, server: string, numThreads: number) : void {
  // Nukes the host & target, then runs a script hacking the remote 'server' with numThreads

  if (ns.hasRootAccess(hostname) == false) {
    ns.tprint(`Nuking server ${hostname}`)
    nukeServer(ns, hostname)
  }

  if (ns.hasRootAccess(server) == false) {
    ns.tprint(`Nuking target server ${server}`)
    nukeServer(ns, server)
  }

  ns.tprint(`Server ${hostname} executing hack script for ${server}...`)
  ns.tprint(`${numThreads} threads`)
  ns.scp("/scripts/hack/hack_2.js", hostname)
  ns.exec("/scripts/hack/hack_2.js", hostname, numThreads, server)
  ns.tprint(`${hostname} done executing hack`)
}