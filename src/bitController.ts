import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
  // Controller for the overall management of bitburner gameplay

  // Starting values 
  const initMoney = ns.getServerMoneyAvailable("home")
  const initHackLevel = ns.getHackingLevel()
  const reservedHomeRam = 16   // amount of RAM on home to save for scripts

  let currentHackLevel = initHackLevel
  let lastHackLevel = -100
  // MAIN APP LOOP
  while(true) {
    // run the hacks if our hacking level has increased by 5 or more
    if (currentHackLevel >= lastHackLevel+5) {
      ns.tprint("Hack level has increased.  Running new scripts...")
      ns.tprint(`Current money is ${ns.getServerMoneyAvailable("home")}, money on script start was ${initMoney}`)
      ns.run("/src/hack/runAllHacks.js", 1, reservedHomeRam)
      lastHackLevel = currentHackLevel
    }
    
    // wait 1 minute if our hack skill is under 100
    if (currentHackLevel < 100) {
      await ns.sleep(60000)
    } else {
      // wait 10 minutes
      await ns.sleep(600000)
    }
    
    currentHackLevel = ns.getHackingLevel()
  }
}