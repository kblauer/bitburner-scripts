import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
  // Prints server info for the host or server in argument to the terminal

  const target = ns.args[0] ? ns.args[0] as string : ns.getHostname()

  ns.tprint(`## Server Info for ${target} ##`)

  // hacking info
  ns.tprint(`Server security level: ${ns.getServerSecurityLevel(target)}`)
  ns.tprint(`Server min security level: ${ns.getServerMinSecurityLevel(target)}`)

  // money info
  const moneyPercent = Math.floor((ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target)) * 100)
  ns.tprint(`Server max money: ${ns.getServerMaxMoney(target)}`)
  ns.tprint(`Server current money: ${ns.getServerMoneyAvailable(target)}`)
  ns.tprint(`Server money %: ${moneyPercent}%`)

}