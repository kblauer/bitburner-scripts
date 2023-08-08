import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
  // Nukes the target after opening as many ports as possible.
  // This is written in a separate payload so that we avoid the
  // RAM cost of these ns.xx methods in the infinite hack script
  //
  // This is not used, since you can just nuke the server from the local script. Duh.

  const target = ns.getHostname()

  ns.print("**** STARTING NUKE ****")

  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.print("Running BruteSSH.exe")
    ns.brutessh(target)
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.print("Running FTPCrack.exe")
    ns.ftpcrack(target)
  }

  ns.print("Running NUKE.exe")
  ns.nuke(target)

  ns.print("**** DONE ****")
}