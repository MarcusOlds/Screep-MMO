var initializeVariables = {
    run: function(){
        //room 1 desired creeps by role
        var Spawn1={
            roomName: "W3S27",
            spawnName: "Spawn1",
            numHarvesters: 0,
            numUpgraders: 1,
            numBuilders: 0,
            numStockers: 2,
            numTowerStockers: 1,
            numExtensionStockers: 2,
            numMaintainers: 0,
            numClaimers: 0,
            numDropHarvesters: 2,
            numAttackers: 0,
            numHealers: 0
        }
        //room 2 desired creeps by role
        var Spawn2={
            roomName: "W3S26",
            spawnName: "Spawn2",
            numHarvesters: 0,
            numUpgraders: 1,
            numBuilders: 0,
            numStockers: 1,
            numTowerStockers: 1,
            numExtensionStockers: 1,
            numMaintainers: 0,
            numClaimers: 0,
            numDropHarvesters: 1,
            numAttackers: 0,
            numHealers: 0
        }
        //Room 3 desired Creeps by role
        var Spawn3={
            roomName: "W2S29",
            spawnName: "Spawn3",
            numHarvesters: 0,
            numUpgraders: 1,
            numBuilders: 1,
            numStockers: 2,
            numTowerStockers: 1,
            numExtensionStockers: 2,
            numMaintainers: 0,
            numClaimers: 0,
            numDropHarvesters: 2,
            numAttackers: 0,
            numHealers: 0
        }
        //put all rooms into an array
        var spawnRooms = [Spawn1, Spawn2, Spawn3];
        Memory.spawnRooms = spawnRooms; 
        //set max wall and rampart health to stop maintainance creeps from wasting all energy on just increasing wall strength
        Memory.minMaxes = {wallStrengthGoal: 110000, rampartStengthGoal: 3000000, working: false, upgradeWalls: false};

        //set array variable for room reservations
        Memory.ExpansionRooms = ['W3S28','W3S29'];
        //set Expansion Room Screeps
        var ExpansionCreeps={
            spawnName: "Spawn1",
            numHarvesters: 2,
            numUpgraders: 0,
            numBuilders: 0,
            numStockers: 0,
            numTowerStockers: 0,
            numExtensionStockers: 0,
            numMaintainers: 1,
            numClaimers: 0,
            numDropHarvesters: 0,
            numAttackers: 0,
            numHealers: 0       
        }
        Memory.ExpansionCreeps = ExpansionCreeps;
        Memory.ExpansionActive = true;
        Memory.initialize = false;
    }
}
module.exports = initializeVariables;