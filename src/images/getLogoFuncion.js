import AugustanaLogo from './smallLogos/AugustanaLogo.png'
import BemidjiLogo from './smallLogos/BemidjiLogo.png'
import CSPLogo from './smallLogos/CSPLogo.png'
import DuluthLogo from './smallLogos/DuluthLogo.png'
import MankatoLogo from './smallLogos/MankatoLogo.png'
import MinotLogo from './smallLogos/MinotLogo.png'
import MSUMLogo from './smallLogos/MSUMLogo.png'
import NorthernLogo from './smallLogos/NorthernLogo.png'
import SMSULogo from './smallLogos/SMSULogo.png'
import SouixFallsLogo from './smallLogos/SouixFallsLogo.png'
import UMaryLogo from './smallLogos/UMaryLogo.png'
import WayneStateLogo from './smallLogos/WayneStateLogo.png'
import WinonaLogo from './smallLogos/WinonaLogo.png'

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
