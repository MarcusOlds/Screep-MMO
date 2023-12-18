var buildClaimer = {
    run: function(numClaimers,numDropHarvesters) {
        var dropharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'drop harvester');
        if(dropharvesters.length >= numDropHarvesters){
            var energyNeeded = 650;
            var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
            console.log('Claimers: ' + claimers.length + '/' + numClaimers);
            var claim1 = false;
            var claim2 = false;
            var claim3 = false;
            
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(creep.memory.claim == 0){
                    claim1 = true;
                };
                if(creep.memory.claim == 1){
                    claim2 = true;
                };
                if(creep.memory.claim == 2){
                    claim3 = true;
                };
            }
            var setClaim = -1;
            if(!(claim1)){
                setClaim = 0;
            }
            if(!(claim2)){
                setClaim = 1;
            }
            if(!(claim3)){
                setClaim = 2;
            }
            if(claimers.length < numClaimers && Game.spawns['Spawn1'].room.energyAvailable >= energyNeeded) {
                var newName = 'Claimer' + Game.time;
                //console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE], newName, 
                    {memory: {role: 'claimer', claim: setClaim,depositing: false,home: 'W3S27',targetGoal: 'nothing',harvestinfo: {harvesting: false, harvestsource: 0,totalHarvested: 0}}});
            }else if(claimers.length > numClaimers){
                //console.log('Number of Harvesters Target Reached')
            }else if(Game.spawns['Spawn1'].energy < energyNeeded && claimers.length < numClaimers){
                //console.log('Need More Energy, Energy Needed: ' + energyNeeded + 'Energy Stored:' + Game.spawns['Spawn1'].room.energyAvailable)
            }
            
            if(Game.spawns['Spawn1'].spawning) { 
                var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
                Game.spawns['Spawn1'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Spawn1'].pos.x + 1, 
                    Game.spawns['Spawn1'].pos.y, 
                    {align: 'left', opacity: 0.8});
            }            
        }

	}
};

module.exports = buildClaimer;