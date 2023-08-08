import { NS } from '@ns'

export default function nukeServer(ns: NS, hostname: string) : void {
  // Opens all the ports we can on a server and then nukes it

  ns.tprint(`Nuking server ${hostname}`)
  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.tprint("Running BruteSSH.exe")
    ns.brutessh(hostname)
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.tprint("Running FTPCrack.exe")
    ns.ftpcrack(hostname)
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.tprint("Running relaySMTP.exe")
    ns.relaysmtp(hostname)
  }

  ns.tprint("Running NUKE.exe")
  ns.nuke(hostname)
  ns.tprint("Done nuking server")
}