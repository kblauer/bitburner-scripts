import { NS } from '@ns'
import remoteHackFactory from 'src/hack/remoteHackFactory'
import localHackFactory from 'src/hack/localHackFactory'
import ownedServerHackFactory from '/src/hack/ownedServerHackFactory'
import localReputationBoost from '/src/hack/localReputationBoost'

export async function main(ns : NS) : Promise<void> {
  // Runs hack scripts on every available server at my current hack level

  const reservedHomeRam = ns.args[0] ? ns.args[0] as number : 6
  const homeForReputationBoost = ns.args[1] ? ns.args[1] as boolean : false
  
  ns.tprint("**** START HACKS ****")

  ns.tprint("-- Creating remote hacks --")
  remoteHackFactory(ns)
  ns.tprint("-- Done creating remote hacks --")

  if (!homeForReputationBoost) {
    ns.tprint("-- Creating big money hacks on my servers --")
    ownedServerHackFactory(ns)
    ns.tprint("-- Done creating big money --")

    ns.tprint("-- Starting local hacks --")
    localHackFactory(ns, reservedHomeRam)  // ** will kill the script via ns.spawn **
  } else {
    ns.tprint("-- Starting reputation boosting loop with local RAM --")
    localReputationBoost(ns, reservedHomeRam)
  }
}