import { NS } from '@ns'

const serverBlacklist = [
  "home",
  "darkweb",
  "value"
]

function getHackableServers(ns : NS, servers: string[]) : string[] {
  return servers.filter((server) => {
    if (serverBlacklist.indexOf(server) == -1) {
      if (ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
        return ns.getServerNumPortsRequired(server) <= getNumPortOpeners(ns)
      }
    }
    return false
  })
}

function getMoneyServers(ns : NS, servers: string[]) : string[] {
  return servers.filter((server) => {
    if (serverBlacklist.indexOf(server) == -1) {
      return ns.getServerMaxMoney(server) > 0
    } else return false
  })
}

function getNumPortOpeners(ns : NS) {
  let numPortOpeners = 0
  if (ns.fileExists("BruteSSH.exe", "home")) numPortOpeners++
  if (ns.fileExists("FTPCrack.exe", "home")) numPortOpeners++
  if (ns.fileExists("relaySMTP.exe", "home")) numPortOpeners++
  if (ns.fileExists("HTTPWorm.exe", "home")) numPortOpeners++
  if (ns.fileExists("SQLInject.exe", "home")) numPortOpeners++
  return numPortOpeners
}

export {getHackableServers, getMoneyServers, getNumPortOpeners}