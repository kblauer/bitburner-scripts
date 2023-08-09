import { NS } from '@ns'
import hackBestMoney from 'src/hack/local/hackBestMoney'

export default function ownedServerHackFactory(ns : NS) : void {
  //  Starts scripts on any owned server we have purchased this augment cycle

  hackBestMoney(ns)
}