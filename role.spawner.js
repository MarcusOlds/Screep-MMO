var roleSpawner = {
    CheckForRenew: function() {
        if(!(Game.spawns['Spawn1'].spawning)){
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(Game.spawns['Spawn1'].pos.inRangeTo(creep,1) && creep.ticksToLive <= 1300){
                    Game.spawns['Spawn1'].renewCreep(creep);
                    console.log(creep.name + " is being renewed");
                }
            }  
        }
	}
};

module.exports = roleSpawner;