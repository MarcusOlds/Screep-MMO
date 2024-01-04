var buildScreeps = require('build.screeps');

var roleSpawner = {
    CheckForRenew: function(spawnName) {
        if(!(Game.spawns[spawnName].spawning) && Game.spawns[spawnName].room.energyAvailable >= 300){
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(Game.spawns[spawnName].pos.inRangeTo(creep,1) && creep.ticksToLive <= 1450){
                    Game.spawns[spawnName].renewCreep(creep);
                    console.log(creep.name + " is being renewed");
                }
            }  
        }
	},
    CheckForMineral: function(spawnName){
        var mineralID = Game.spawns[spawnName].room.memory.mineralid
        var controllerLevel = Game.spawns[spawnName].room.controller.level
        var mineralAmount = Game.getObjectById(mineralID).mineralAmount
        if(mineralAmount > 0 && controllerLevel > 5){
            var energyAvailableInRoom = Game.spawns[spawnName].room.energyAvailable;
            buildScreeps.run('mineral harvester', 1,spawnName, energyAvailableInRoom);
        }
    }
};

module.exports = roleSpawner;