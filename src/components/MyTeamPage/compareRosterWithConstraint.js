/**
 * This file holds all of the comparing functions for the My Team page.
 * It's purpose it to determine if a roster is valid based on the constraints,
 * and how many RosterObjects are meant to be displayed with what information.
 */

export function compareConstraintQB(rosterQb, constraintsQb) {
    let objectRenderList = [];
    let errorFlag = false;
    if (rosterQb.length === constraintsQb) {
        rosterQb.forEach((player) => {
            objectRenderList.push([player['player'], "QB"]);
        });
    }
    else if (rosterQb.length < constraintsQb) {
        rosterQb.forEach((player) => {
            objectRenderList.push([player['player'], "QB"]);
        });
        for (let i = 0; i < constraintsQb - rosterQb.length; i++) {
            objectRenderList.push([null, "QB"]);
        }
    }
    else if (rosterQb.length > constraintsQb) {
        for (let i = 0; i < constraintsQb; i++) {
            objectRenderList.push([rosterQb[i]['player'], "QB"]);
        }
        errorFlag = true;
    }
    return [objectRenderList, errorFlag];
}

export function compareConstraintRB(rosterRb, constraintsRb) {
    const objectRenderList = [];
    const errorFlag = false;
    if (rosterRb.length === constraintsRb) {
        rosterRb.forEach((player) => {
            objectRenderList.push([player['player'], "RB"]);
        });
    }
    else if (rosterRb.length < constraintsRb) {
        rosterRb.forEach((player) => {
            objectRenderList.push([player['player'], "RB"]);
        });
        for (let i = 0; i < constraintsRb - rosterRb.length; i++) {
            objectRenderList.push([null, "RB"]);
        }
    }
    else if (rosterRb.length > constraintsRb) {
        for (let i = 0; i < constraintsRb; i++) {
            objectRenderList.push([rosterRb[i]['player'], "RB"]);
        }
        errorFlag = true;
    }
    return [objectRenderList, errorFlag];
}

export function compareConstraintWR(rosterWr, constraintsWr) {
    const objectRenderList = [];
    const errorFlag = false;
    if (rosterWr.length === constraintsWr) {
        rosterWr.forEach((player) => {
            objectRenderList.push([player['player'], "WR"]);
        });
    }
    else if (rosterWr.length < constraintsWr) {
        rosterWr.forEach((player) => {
            objectRenderList.push([player['player'], "WR"]);
        });
        for (let i = 0; i < constraintsWr - rosterWr.length; i++) {
            objectRenderList.push([null, "WR"]);
        }
    }
    else if (rosterWr.length > constraintsWr) {
        for (let i = 0; i < constraintsWr; i++) {
            objectRenderList.push([rosterWr[i]['player'], "WR"]);
        }
        errorFlag = true;
    }
    return [objectRenderList, errorFlag];
}

export function compareConstraintTE(rosterTe, constraintsTe) {
    const objectRenderList = [];
    const errorFlag = false;
    if (rosterTe.length === constraintsTe) {
        rosterTe.forEach((player) => {
            objectRenderList.push([player['player'], "TE"]);
        });
    }
    else if (rosterTe.length < constraintsTe) {
        rosterTe.forEach((player) => {
            objectRenderList.push([player['player'], "TE"]);
        });
        for (let i = 0; i < constraintsTe - rosterTe.length; i++) {
            objectRenderList.push([null, "TE"]);
        }
    }
    else if (rosterTe.length > constraintsTe) {
        for (let i = 0; i < constraintsTe; i++) {
            objectRenderList.push([rosterTe[i]['player'], "TE"]);
        }
        errorFlag = true;
    }
    return [objectRenderList, errorFlag];
}

export function compareConstraintK(rosterK, constraintsK) {
    const objectRenderList = [];
    const errorFlag = false;
    if (rosterK.length === constraintsK) {
        rosterK.forEach((player) => {
            objectRenderList.push([player['player'], "K"]);
        });
    }
    else if (rosterK.length < constraintsK) {
        rosterK.forEach((player) => {
            objectRenderList.push([player['player'], "K"]);
        });
        for (let i = 0; i < constraintsK - rosterK.length; i++) {
            objectRenderList.push([null, "K"]);
        }
    }
    else if (rosterK.length > constraintsK) {
        for (let i = 0; i < constraintsK; i++) {
            objectRenderList.push([rosterK[i]['player'], "K"]);
        }
        errorFlag = true;
    }
    return [objectRenderList, errorFlag];
}

export function compareConstraintBench(rosterBench, constraintsBench, totalPlayers) {
    const objectRenderList = [];
    const errorFlag = false;
    if (rosterBench.length === constraintsBench || 
        (rosterBench.length > constraintsBench && rosterBench.length <= totalPlayers)) {
        rosterBench.forEach((player) => {
            objectRenderList.push([player['player'], "BENCH"]);
        });
    }
    else if (rosterBench.length < constraintsBench) {
        rosterBench.forEach((player) => {
            objectRenderList.push([player['player'], "BENCH"]);
        });
        for (let i = 0; i < constraintsBench - rosterBench.length; i++) {
            objectRenderList.push([null, "BENCH"]);
        }
    }
    else if (rosterBench.length > constraintsBench && rosterBench.length > totalPlayers) {
        for (let i = 0; i < totalPlayers; i++) {
            objectRenderList.push([rosterBench[i]['player'], "BENCH"]);
        }
        errorFlag = true;
    }
    return [objectRenderList, errorFlag];
}
