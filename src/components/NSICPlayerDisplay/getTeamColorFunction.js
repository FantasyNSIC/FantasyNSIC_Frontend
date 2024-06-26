// File contains functions to get main and faded team colors for display.

// Function to get the main team color.
export function getTeamColorMain(team_id) {
    switch (team_id) {
        case 1:
            return "rgb(14, 27, 59)";
        case 2:
            return "rgb(0, 77, 68)";
        case 3:
            return "rgb(10, 49, 84)";
        case 4:
            return "rgb(8, 46, 109)";
        case 5:
            return "rgb(142, 10, 38)";
        case 6:
            return "rgb(63, 0, 88)";
        case 7:
            return "rgb(42, 104, 75)";
        case 8:
            return "rgb(206, 20, 44)";
        case 9:
            return "rgb(153, 0, 51)";
        case 10:
            return "rgb(73, 47, 145)";
        case 11:
            return "rgb(56, 21, 7)";
        case 12:
            return "rgb(0, 0, 0)";
        case 13:
            return "rgb(75, 8, 161)";
        default:
            return "rgb(226, 226, 226)";
    };
}

// Function to get secondary team color.
export function getTeamColorSecondary(team_id) {
    switch (team_id) {
        case 1:
            return "rgb(252, 208, 6)";
        case 2:
            return "rgb(212, 182, 124)";
        case 3:
            return "rgb(221, 173, 37)";
        case 4:
            return "rgb(251, 103, 29)";
        case 5:
            return "rgb(250, 185, 55)";
        case 6:
            return "rgb(241, 228, 5)";
        case 7:
            return "rgb(204, 0, 51)";
        case 8:
            return "rgb(0, 0, 0)";
        case 9:
            return "rgb(255, 204, 102)";
        case 10:
            return "rgb(255, 255, 255)";
        case 11:
            return "rgb(172, 146, 60)";
        case 12:
            return "rgb(255, 199, 44)";
        case 13:
            return "rgb(255, 255, 255)";
        default:
            return "rgb(226, 226, 226)";
    };
}
