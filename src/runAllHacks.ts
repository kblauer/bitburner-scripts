import { NS } from '@ns'
import remoteHackFactory from '/src/hack/remoteHackFactory'
import localHackFactory from '/src/hack/localHackFactory'

export async function main(ns : NS) : Promise<void> {
  // Runs hack scripts on every available server at my current hack level
  
  ns.tprint("**** START HACKS ****")

  ns.tprint("-- Creating remote hacks --")
  remoteHackFactory(ns)
  ns.tprint("-- Done creating remote hacks --")

  ns.tprint("-- Starting local hacks --")
  localHackFactory(ns)  // ** will kill the script via ns.spawn **
}