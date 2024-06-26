import AugustanaLogo from './bigLogos/AugustanaBig.png'
import BemidjiLogo from './bigLogos/BemidjiBig.png'
import CSPLogo from './bigLogos/CSPBig.png'
import DuluthLogo from './bigLogos/DuluthBig.png'
import MankatoLogo from './bigLogos/MankatoBig.png'
import MinotLogo from './bigLogos/MinotBig.webp'
import MSUMLogo from './bigLogos/MoorheadBig.png'
import NorthernLogo from './bigLogos/NorthernBig.webp'
import SMSULogo from './bigLogos/SMSUBig.png'
import SouixFallsLogo from './bigLogos/SiouxFallsBig.png'
import UMaryLogo from './bigLogos/UMaryLogo.png'
import WayneStateLogo from './bigLogos/WayneStateBig.webp'
import WinonaLogo from './bigLogos/WinonaBig.png'

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
