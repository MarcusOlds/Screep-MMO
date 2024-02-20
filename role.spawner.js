var buildScreeps = require('build.screeps');
var processTargets = require('process.targets');

var roleSpawner = {
    CheckForRenew: function(spawnName) {
        if(!(Game.spawns[spawnName].spawning) && Game.spawns[spawnName].room.energyAvailable >= 300){
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(Game.spawns[spawnName].pos.inRangeTo(creep,1) && creep.memory.reup){
                    Game.spawns[spawnName].renewCreep(creep);
                }
            }  
        }
	},
    CheckForMineral: function(spawnName){
        switch(Game.spawns[spawnName].pos.roomName){
            case 'W3S27':
                var spawnNum = 1;
                break;
            case 'W3S26':
                var spawnNum = 3;
                break;
            case 'W2S29':
                var spawnNum = 2;
                break;
            default:
                var spawnNum = 0;
                break;
        }
        var mineralID = Game.spawns[spawnName].room.memory.mineralid
        var controllerLevel = Game.spawns[spawnName].room.controller.level
        var mineralAmount = Game.getObjectById(mineralID).mineralAmount
        var extractor = Game.spawns[spawnName].pos.findClosestByRange(FIND_STRUCTURES,
            {filter: {structureType: STRUCTURE_EXTRACTOR}});
        if(mineralAmount > 0 && controllerLevel > 5 && extractor && Game.spawns[spawnName].room.energyAvailable >= 1400){
            var energyAvailableInRoom = Game.spawns[spawnName].room.energyAvailable;
            buildScreeps.run('mineral harvester', spawnNum,spawnName, energyAvailableInRoom, Game.spawns[spawnName].pos.roomName,false,false);
        }
    },
    startFactoryProduction: function(factory,resourceTarget){
        factory.produce(resourceTarget);
    },
    checkIfFactoryReadyToProduce:function(spawnName,factory){
        if(factory.cooldown == 0){
            var mineral = processTargets.getRoomResource(Game.spawns[spawnName])
            if(factory.store[mineral] > 500 && factory.store[RESOURCE_ENERGY] > 200){
                switch(mineral){
                    case RESOURCE_UTRIUM:
                        var productionTarget = RESOURCE_UTRIUM_BAR;
                        break;
                    case RESOURCE_LEMERGIUM:
                        var productionTarget = RESOURCE_LEMERGIUM_BAR;
                        break;
                    case RESOURCE_ZYNTHIUM:
                        var productionTarget = RESOURCE_ZYNTHIUM_BAR;
                        break;
                    case RESOURCE_KEANIUM:
                        var productionTarget = RESOURCE_KEANIUM_BAR;
                        break;
                    case RESOURCE_GHODIUM:
                        var productionTarget = RESOURCE_GHODIUM_BAR;
                        break;
                    case RESOURCE_OXYGEN:
                        var productionTarget = RESOURCE_OXIDANT;
                        break;
                    case RESOURCE_HYDROGEN:
                        var productionTarget = RESOURCE_REDUCTANT;
                        break;
                    case RESOURCE_CATALYST:
                        var productionTarget = RESOURCE_PURIFIER;
                        break;
                }
            }
            if(productionTarget){
                this.startFactoryProduction(factory,productionTarget);
            }
        }

    },
    checkForFactory: function(spawnName){
        var factory = Game.spawns[spawnName].pos.findClosestByRange(FIND_STRUCTURES,
            {filter: {structureType: STRUCTURE_FACTORY}});
        if(factory){
            this.checkIfFactoryReadyToProduce(spawnName,factory)
        }
    }
};

module.exports = roleSpawner;