var buildHarvester = {
    run: function(numHarvesters,numDropHarvesters) {
        var energyNeeded = 550;
        var dropharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'drop harvester');
        if(dropharvesters.length >= numDropHarvesters){
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            console.log('Harvesters: ' + harvesters.length + '/' + numHarvesters);
            
            if(harvesters.length < numHarvesters && Game.spawns['Spawn1'].room.energyAvailable >= energyNeeded) {
                var newName = 'Harvester' + Game.time;
                //console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'harvester', depositing: false,home: 'W3S27',targetGoal: 'nothing',harvestinfo: {harvesting: false, harvestsource: 0,totalHarvested: 0}}});
            }else if(harvesters.length > numHarvesters){
                //console.log('Number of Harvesters Target Reached')
            }else if(Game.spawns['Spawn1'].energy < energyNeeded && harvesters.length < numHarvesters){
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

module.exports = buildHarvester;