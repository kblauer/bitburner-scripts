import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
  // buy a number of servers with designated RAM

  const numServers = ns.args[0] ? ns.args[0] as number : 10
  const serverRam = ns.args[1] ? ns.args[0] as number : 4096

  for (let i=0; i<numServers; i++) {
    ns.purchaseServer("scriptServer", serverRam)
  }
}