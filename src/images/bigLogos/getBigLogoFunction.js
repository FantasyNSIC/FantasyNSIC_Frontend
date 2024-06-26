import AugustanaLogo from './AugustanaBig.png'
import BemidjiLogo from './BemidjiBig.png'
import CSPLogo from './CSPBig.webp'
import DuluthLogo from './DuluthBig.png'
import MankatoLogo from './MankatoBig.png'
import MinotLogo from './MinotBig.webp'
import MSUMLogo from './MoorheadBig.png'
import NorthernLogo from './NorthernBig.webp'
import SMSULogo from './SMSUBig.png'
import SouixFallsLogo from './SiouxFallsBig.png'
import UMaryLogo from './UMaryBig.png'
import WayneStateLogo from './WayneStateBig.webp'
import WinonaLogo from './WinonaBig.png'

export function getBigLogoFunction(team_id) {
    switch (team_id) {
        case 1:
            return AugustanaLogo;
        case 2:
            return BemidjiLogo;
        case 3:
            return CSPLogo;
        case 4:
            return UMaryLogo;
        case 5:
            return DuluthLogo;
        case 6:
            return MankatoLogo;
        case 7:
            return MinotLogo;
        case 8:
            return MSUMLogo;
        case 9:
            return NorthernLogo;
        case 10:
            return SouixFallsLogo;
        case 11:
            return SMSULogo;
        case 12:
            return WayneStateLogo;
        case 13:
            return WinonaLogo;
        default:
            return null;
    }
}
