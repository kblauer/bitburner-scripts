import { NS } from '@ns'
import hackNeighbors from 'src/hack/local/hackNeighbors'

export default function localHackFactory(ns : NS) : void {
  // Starts scripts on the local machine for hacking remote servers

  // this method will run ns.spawn, which kills whatever script calls it
  hackNeighbors(ns)
}