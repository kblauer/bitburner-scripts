import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
  // money or train
  const goal = ns.args[0] ? ns.args[0] as string : 'money'

  const members = ns.gang.getMemberNames()
  switch (goal) {
    case 'money':
      for (const member of members) {
        ns.gang.setMemberTask(member, "Money Laundering")
      }
      break
    case 'train':
      for (const member of members) {
        ns.gang.setMemberTask(member, 'Train Hacking')
      }
      break
    case 'rep':
      for (const member of members) {
        ns.gang.setMemberTask(member, 'Cyberterrorism')
      }
      break
    case 'ascend':
      for (const member of members) {
        ns.gang.ascendMember(member)
      }
      break
    case 'rootkit':
      for (const member of members) {
        ns.gang.purchaseEquipment(member, "NUKE Rootkit")
        ns.gang.purchaseEquipment(member, "Soulstealer Rootkit")
        ns.gang.purchaseEquipment(member, "Demon Rootkit")
        ns.gang.purchaseEquipment(member, "Hmap Node")
        ns.gang.purchaseEquipment(member, "Jack the Ripper")
      }
      break
    case 'augment':
      for (const member of members) {
        ns.gang.purchaseEquipment(member, "BitWire")
        ns.gang.purchaseEquipment(member, "Neuralstimulator")
        ns.gang.purchaseEquipment(member, "DataJack")
      }
  }
}