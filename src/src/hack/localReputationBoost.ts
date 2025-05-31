import { NS } from '@ns'

export default function localReputationBoost(ns : NS, reservedHomeRam: number) : Promise<void> {
  // use all available home RAM to boost reputation for current faction every 10s
  const scriptPath = "/src/hack/payload/reputationPayload.js"
  const availableRam = ns.getServerMaxRam('home') - reservedHomeRam
  const threadDivis = ns.getScriptRam(scriptPath)
  const numThreads = Math.floor(availableRam / threadDivis)

  ns.tprint('spawning ', scriptPath, ' with ', numThreads)
  ns.tprint('Sharing home RAM with active faction')
  ns.tprint("**** END HACKS- ****")
  ns.spawn(scriptPath, numThreads)
}
