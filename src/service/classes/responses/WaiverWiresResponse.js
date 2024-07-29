import { WaiverWireClaim } from '../WaiverWireClaim.js';

/**
 * This class represents a list of waiver wire claims for a given user.
 */

export class WaiverWiresResponse {
    constructor(waiverWireClaims) {
        this.waiverWireClaims = waiverWireClaims;
    }

    static fromJson(jsonStr) {
        const data = JSON.parse(jsonStr);
        const waiverWireClaims = data.waiver_wire_claims.map(claim => WaiverWireClaim.fromJson(claim));
        return new WaiverWiresResponse(waiverWireClaims);
    }

    toJson() {
        const data = {
            waiver_wire_claims: this.waiverWireClaims.map(claim => claim.toJson())
        };
        return JSON.stringify(data);
    }

    static fromResponse(response) {
        return new WaiverWiresResponse(response.data.waiver_wire_claims.map(claim => WaiverWireClaim.fromResponse(claim)));
    }
}