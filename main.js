//planned future feateure
var defenseMode = false;
//used to reset game memory
var initialize = true;
Memory.initialize = initialize;
//used for troubleshooting scripts to emergency stop all creeps in case of issues/errors
var emergencyStop = false;

//importing all modules required for main loop
var marketTask = require('market');
var roleSpawner = require('role.spawner');
var roleTower = require('role.tower');
var roleLink = require('role.link');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleStocker = require('role.stocker');
var roleMaintainer = require('role.maintainer');
var roleClaimer = require('role.claimer');
var roleDropHarvester = require('role.dropharvester');
var roleAttacker = require('role.attacker');
var roleMineralHarvester = require('role.mineralharvester')
var roleHealer = require('role.healer');
var roleHighwayHarvester = require('role.highwayharvester');
var buildScreeps = require('build.screeps');
var expansionRoomSpawn = require('ExpansionRoom.spawn');
var highwayRoomSpawn = require('HighwayRoom.spawn');
const initializeVariables = require('initialize.variables');

//initialize Desired Creep Numbers by Spawn Room saved to Game Memory
//if needing to reset this for anyreason delete the spawnRooms from Memory by running:
//delete Memory.spawnRooms
//after which this will run again and use the below values as your new default

module.exports.loop = function () {
    //initialize
    if(Memory.initialize){
        initializeVariables.run();
    }
    //convert game memory to memory
    var spawnRooms = Memory.spawnRooms;
    var wallStrengthGoal = Memory.minMaxes.wallStrengthGoal;
    var rampartStrengthGoal = Memory.minMaxes.rampartStengthGoal;
    var ExpansionRooms = Memory.ExpansionRooms;
    var HighwayRooms = Memory.HighwayRooms;
    var gameTime = Game.time;
    var bucketCPU = Game.cpu.bucket;
    //reset working status of towers
    Memory.minMaxes.working = false;
    console.log(JSON.stringify(gameTime));
    //check cpu bucket and if its full create a pixel
    if(bucketCPU == 10000){
        Game.cpu.generatePixel()
    }
    //create screeps as needed per room every 5 ticks
    if(gameTime % 5 == 0){
        spawnRooms.forEach(function (spawnRoom, index){
            var energyAvailableInRoom = Game.spawns[spawnRoom.spawnName].room.energyAvailable;
            console.log('Energy Available in '+ spawnRoom.spawnName + " " + energyAvailableInRoom)
            buildScreeps.run('harvester', spawnRoom.numHarvesters,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run('builder', spawnRoom.numBuilders,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run("upgrader",spawnRoom.numUpgraders,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run("maintainer", spawnRoom.numMaintainers, spawnRoom.spawnName,energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run('claimer', spawnRoom.numClaimers,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run("attacker", spawnRoom.numAttackers, spawnRoom.spawnName,energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run('drop harvester', spawnRoom.numDropHarvesters,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run("stocker", spawnRoom.numStockers,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run("towerstocker", spawnRoom.numTowerStockers,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run("extensionstocker", spawnRoom.numExtensionStockers,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
            buildScreeps.run("healer", spawnRoom.numHealers,spawnRoom.spawnName, energyAvailableInRoom, spawnRoom.roomName,false);
        });
    };
    //expand to a new room if ExpansionActive is set
    if(Memory.ExpansionActive){
        //spawn creeps for expansions rooms
        ExpansionRooms.forEach(function(expansionRoom){
            expansionRoomSpawn.spawn(expansionRoom);
        })       
    }

    //mine Highway
    if(Memory.HighwayMining){
        HighwayRooms.forEach(function(HighwayRoom){
            highwayRoomSpawn.spawn(HighwayRoom);
        })
    }
    

    //check for dead creeps that still have something in memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            //console.log(Memory.creeps[name].harvestinfo.totalHarvested);
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
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
        roleTower.run(tower,wallStrengthGoal,rampartStrengthGoal);
    });
    towers = Game.spawns['Spawn2'].room.find(FIND_MY_STRUCTURES,{filter:{ structureType: STRUCTURE_TOWER}})
    towers.forEach(function (tower, index){
        roleTower.run(tower,wallStrengthGoal,rampartStrengthGoal);
    });
    towers = Game.spawns['Spawn3'].room.find(FIND_MY_STRUCTURES,{filter:{ structureType: STRUCTURE_TOWER}})
    towers.forEach(function (tower, index){
        roleTower.run(tower,wallStrengthGoal,rampartStrengthGoal);
    });
    //if no towers working increase minMaxes if upgadeWalls is true
    if(Memory.minMaxes.working == false && Memory.minMaxes.upgradeWalls == true){
        roleTower.increaseMinMaxes();
    }

    var links = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES,{filter:{ structureType: STRUCTURE_LINK}})
    links.forEach(function (link, index){
        roleLink.run(link.id);
    });
    //if emergencyStop is true then no roles will be processed and all creeps will freeze
    if(!(emergencyStop)){
        //execute logic on creeps based on their roles
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            //check if low time to live
            if(creep.ticksToLive <= 500 && creep.room.energyAvailable >= 500){
                //start reuping
                creep.memory.reup = true;
            }
            //if needing reup
            if(creep.memory.reup == true){
                //move to the spawn
                creep.moveTo(creep.pos.findClosestByPath(FIND_MY_SPAWNS))
                //check if done
                if(creep.ticksToLive >= 1300 || creep.room.energyAvailable < 300){
                    //stop reup and start working
                    creep.memory.reup = false;
                }
            }
            if(creep.memory.reup != true){
                
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
                    roleMaintainer.run(creep, wallStrengthGoal, rampartStrengthGoal);
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
                if(creep.memory.role == 'healer'){
                    roleHealer.run(creep);
                }
                if(creep.memory.role == 'Highway Harvester'){
                    roleHighwayHarvester.run(creep);
                }
            }
        }
    }
    if(gameTime % 2000 == 0){
        targetResources = RESOURCES_ALL;
        var valuableSalesOrders = [];
        var i = Memory.renewPricesLocation
        for(i; i<Memory.renewPricesLocation+1;i++){
            console.log(JSON.stringify(targetResources[i]))
            ordersToBuy = marketTask.findSellTransaction(targetResources[i]);
            valuableSalesOrders = valuableSalesOrders.concat(ordersToBuy);
        }
        Memory.renewPricesLocation = Memory.renewPricesLocation + 1
        if(Memory.renewPricesLocation >= targetResources.length){
            Memory.renewPricesLocation = 0;
        }
        console.log(JSON.stringify(valuableSalesOrders));
    }
}