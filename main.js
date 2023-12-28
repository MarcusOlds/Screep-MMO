//planned future feateure
var defenseMode = false;
//used to reset game memory
var initialize = false;
//used for troubleshooting scripts to emergency stop all creeps in case of issues/errors
var emergencyStop = false;

//importing all modules required for main loop
var roleSpawner = require('role.spawner');
var roleTower = require('role.tower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleStocker = require('role.stocker');
var roleMaintainer = require('role.maintainer');
var roleClaimer = require('role.claimer');
var roleDropHarvester = require('role.dropharvester');
var roleAttacker = require('role.attacker');
var roleMineralHarvester = require('role.mineralharvester')
var buildScreeps = require('build.screeps');

//initialize Desired Creep Numbers by Spawn Room saved to Game Memory
//if needing to reset this for anyreason delete the spawnRooms from Memory by running:
//delete Memory.spawnRooms
//after which this will run again and use the below values as your new default
if(initialize){
    var Spawn1={
        spawnName: "Spawn1",
        numHarvesters: 0,
        numUpgraders: 1,
        numBuilders: 0,
        numStockers: 2,
        numTowerStockers: 1,
        numExtensionStockers: 1,
        numMaintainers: 3,
        numClaimers: 1,
        numDropHarvesters: 4,
        numAttackers: 3
    }
    //room 1 desired creeps by role
    var Spawn2={
        spawnName: "Spawn2",
        numHarvesters: 0,
        numUpgraders: 1,
        numBuilders: 1,
        numStockers: 2,
        numTowerStockers: 1,
        numExtensionStockers: 1,
        numMaintainers: 1,
        numClaimers: 0,
        numDropHarvesters: 0,
        numAttackers: 0
    }
    //put all rooms into an array
    var spawnRooms = [Spawn1, Spawn2];
    Memory.spawnRooms = spawnRooms; 
}
if(initialize){
    //set max wall and rampart health to stop maintainance creeps from wasting all energy on just increasing wall strength
    Memory.minMaxes = {wallStrengthGoal: 110000, rampartStengthGoal: 3000000};
}

module.exports.loop = function () {
    var spawnRooms = Memory.spawnRooms;
    var wallStrengthGoal = Memory.minMaxes.wallStrengthGoal;
    var rampartStenghtGoal = Memory.minMaxes.rampartStengthGoal;
    //log tick time
    var gameTime = Game.time
    console.log(Game.time)
    //create screeps as needed per room every 5 ticks
    if(gameTime % 5 == 0){
        spawnRooms.forEach(function (spawnRoom, index){
            var energyAvailableInRoom = Game.spawns[spawnRoom.spawnName].room.energyAvailable;
            console.log('Energy Available in '+ spawnRoom.spawnName + " " + energyAvailableInRoom)
            buildScreeps.run('harvester', spawnRoom.numHarvesters,spawnRoom.spawnName, energyAvailableInRoom);
            buildScreeps.run('builder', spawnRoom.numBuilders,spawnRoom.spawnName, energyAvailableInRoom);
            buildScreeps.run("upgrader",spawnRoom.numUpgraders,spawnRoom.spawnName, energyAvailableInRoom);
            buildScreeps.run("maintainer", spawnRoom.numMaintainers, spawnRoom.spawnName,energyAvailableInRoom);
            buildScreeps.run('claimer', spawnRoom.numClaimers,spawnRoom.spawnName, energyAvailableInRoom);
            buildScreeps.run("attacker", spawnRoom.numAttackers, spawnRoom.spawnName,energyAvailableInRoom);
            buildScreeps.run('drop harvester', spawnRoom.numDropHarvesters,spawnRoom.spawnName, energyAvailableInRoom);
            buildScreeps.run("stocker", spawnRoom.numStockers,spawnRoom.spawnName, energyAvailableInRoom);
            buildScreeps.run("towerstocker", spawnRoom.numTowerStockers,spawnRoom.spawnName, energyAvailableInRoom);
            buildScreeps.run("extensionstocker", spawnRoom.numExtensionStockers,spawnRoom.spawnName, energyAvailableInRoom);
        });
    
        //check for dead creeps that still have something in memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                //console.log(Memory.creeps[name].harvestinfo.totalHarvested);
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

    //spawner check for creeps near by to renew them
    spawnRooms.forEach(function (spawnRoom, index){
        roleSpawner.CheckForRenew(spawnRoom.spawnName);
        roleSpawner.CheckForMineral(spawnRoom.spawnName);
    });
    

    //tower logic 
    //needs a lot of work its still not dynamic at all
    var towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES,{filter:{ structureType: STRUCTURE_TOWER}})
    towers.forEach(function (tower, index){
        roleTower.run(tower,wallStrengthGoal,rampartStenghtGoal);
    });
    towers = Game.spawns['Spawn2'].room.find(FIND_MY_STRUCTURES,{filter:{ structureType: STRUCTURE_TOWER}})
    towers.forEach(function (tower, index){
        roleTower.run(tower,wallStrengthGoal,rampartStenghtGoal);
    });

    //if emergencyStop is true then no roles will be processed and all creeps will freeze
    if(!(emergencyStop)){
        //execute logic on creeps based on their roles
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'stocker' || creep.memory.role == 'extensionstocker' || creep.memory.role == 'towerstocker') {
                roleStocker.run(creep);
            }
            if(creep.memory.role == 'maintainer'){
                roleMaintainer.run(creep, wallStrengthGoal, rampartStenghtGoal);
            }
            if(creep.memory.role == 'claimer'){
                roleClaimer.run(creep);
            }
            if(creep.memory.role == 'drop harvester'){
                roleDropHarvester.run(creep);
            }
            if(creep.memory.role == 'attacker'){
                roleAttacker.run(creep);
            }
            if(creep.memory.role == 'mineral harvester'){
                roleMineralHarvester.run(creep);
            }
        }
    }

}