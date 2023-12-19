var roleSpawner = {
    CheckForRenew: function(spawnName) {
        if(!(Game.spawns[spawnName].spawning)){
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(Game.spawns[spawnName].pos.inRangeTo(creep,1) && creep.ticksToLive <= 1300){
                    Game.spawns[spawnName].renewCreep(creep);
                    console.log(creep.name + " is being renewed");
                }
            }  
        }
	}
};

module.exports = roleSpawner;