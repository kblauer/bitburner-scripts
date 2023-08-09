import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
  // Payload sent to all hackable servers to run hack scripts
  // This is written with as many arguments as possible to avoid calling 
  // RAM-consuming ns.xx methods

  const target = ns.args[0] as string
  const serverMaxMoney = ns.args[1] as number
  const serverMinSecurityLevel = ns.args[2] as number

  // multipliers for money and security
  const moneyThreshMult = 0.5
  const securityThreshMulti = 1.5

  // Defines how much money a server should have before we need to grow it
  const moneyThresh = serverMaxMoney * moneyThreshMult

  /*  Old security threshold calculations.  These do more hacking, but I think for higher security servers we should
      try lowering the security level more before hacking.  They aren't making much money in the long run.  
  // Security threshold is reached after the initial reaches 25% higher than floored initial value
  const initialSecurityLevel = ns.getServerSecurityLevel(target)
  const securityThresh : number = Math.floor(initialSecurityLevel) * (1 + securityThreshMulti) */

  const securityThresh = ns.getServerMinSecurityLevel(target) * securityThreshMulti

  // Infinite loop that continously hacks/grows/weakens the target server
  let lastGrowMult = 100.00
  let numHacks = 0
  while(true) {
    // if we've done 10 hacks without resetting the grow mult, try growing again
    if (numHacks > 10) {
      lastGrowMult = 100
      numHacks = 0
    }

    if (ns.getServerSecurityLevel(target) > securityThresh) {
      // If the server's security level is above our threshold, weaken it
      ns.print(`weakening, security level is ${ns.getServerSecurityLevel(target)}, 
              threshold is ${securityThresh}, min is ${serverMinSecurityLevel}`)
      await ns.weaken(target)
    } else if (lastGrowMult > 1.0 && ns.getServerMoneyAvailable(target) < moneyThresh) {
      // If the server's money is less than our threshold, grow it
      ns.print(`growing, money is ${ns.getServerMoneyAvailable(target)}, 
              threshold is ${moneyThresh}, max is ${serverMaxMoney}`)
      lastGrowMult = (await ns.grow(target) - 1) * 100
      ns.print("lastGrowMult" + lastGrowMult)
    } else {
      // Otherwise, hack it
      ns.print("hacking! hack #" + (numHacks + 1))
      await ns.hack(target)
      numHacks++
    }
  }
}