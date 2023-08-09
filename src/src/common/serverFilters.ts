import { NS } from '@ns'

const serverBlacklist = [
  "home",
  "darkweb"
]

function getHackableServers(ns : NS, servers: string[]) : string[] {
  return servers.filter((server) => {
    if (serverBlacklist.indexOf(server) == -1) {
      return ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()
    } else return false
  })
}

function getMoneyServers(ns : NS, servers: string[]) : string[] {
  return servers.filter((server) => {
    if (serverBlacklist.indexOf(server) == -1) {
      return ns.getServerMaxMoney(server) > 0
    } else return false
  })
}

export {getHackableServers, getMoneyServers}