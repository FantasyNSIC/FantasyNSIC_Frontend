import AugustanaLogo from './AugustanaLogo.png'
import BemidjiLogo from './BemidjiLogo.png'
import CSPLogo from './CSPLogo.png'
import DuluthLogo from './DuluthLogo.png'
import MankatoLogo from './MankatoLogo.png'
import MinotLogo from './MinotLogo.png'
import MSUMLogo from './MSUMLogo.png'
import NorthernLogo from './NorthernLogo.png'
import SMSULogo from './SMSULogo.png'
import SouixFallsLogo from './SouixFallsLogo.png'
import UMaryLogo from './UMaryLogo.png'
import WayneStateLogo from './WayneStateLogo.png'
import WinonaLogo from './WinonaLogo.png'

export function getLogoFunction(team_id) {
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
