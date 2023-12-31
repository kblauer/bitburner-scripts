import { NS } from '@ns'
import remoteHackFactory from 'src/hack/remoteHackFactory'
import localHackFactory from 'src/hack/localHackFactory'
import ownedServerHackFactory from '/src/hack/ownedServerHackFactory'

export async function main(ns : NS) : Promise<void> {
  // Runs hack scripts on every available server at my current hack level

  const reservedHomeRam = ns.args[0] ? ns.args[0] as number : 6
  
  ns.tprint("**** START HACKS ****")

  ns.tprint("-- Creating remote hacks --")
  remoteHackFactory(ns)
  ns.tprint("-- Done creating remote hacks --")

  ns.tprint("-- Creating big money hacks on my servers --")
  ownedServerHackFactory(ns)
  ns.tprint("-- Done creating big money --")

  ns.tprint("-- Starting local hacks --")
  localHackFactory(ns, reservedHomeRam)  // ** will kill the script via ns.spawn **
}