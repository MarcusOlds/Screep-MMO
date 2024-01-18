//has been set to drop in nearest container
var harvestTarget = require('harvest.target');
var roleDropHarvester = {

    /** @param {Creep} creep **/
    
    run: function(creep) {
        //at birth creep is not yet "Harvesting" so get an assignment
        if(!(creep.memory.harvestinfo.harvesting)){
            harvestTarget.run(creep);
        }       
        //get havest location from creep memory
        harvestSourceLocation = new RoomPosition(creep.memory.harvestinfo.harvestsourcelocation.x,creep.memory.harvestinfo.harvestsourcelocation.y,creep.memory.harvestinfo.harvestsourcelocation.roomName);
        //get harvest source from creep memory
        harvestSource = creep.memory.harvestinfo.harvestsourceid
        //harvest or move to harvester if the below reponse
        if(creep.harvest(Game.getObjectById(harvestSource)) == ERR_NOT_IN_RANGE || 
        creep.harvest(Game.getObjectById(harvestSource)) == ERR_NOT_FOUND || 
        creep.harvest(Game.getObjectById(harvestSource)) == ERR_INVALID_TARGET) {
            creep.moveTo(harvestSourceLocation,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }else{
            //if harvest worked then count the work body parts and multiple by two to log how much energy was harvested in creeps lifetime
            var workparts = creep.getActiveBodyparts(WORK);
            creep.memory.harvestinfo.totalHarvested = (2 * workparts) + creep.memory.harvestinfo.totalHarvested
        }
        //increase TTL if no harvesting can be done
        //if the ticksToRegeneration are null or the creep is spawning set variable to 0 to avoid errors
        if(creep.memory.harvestinfo.harvestsource != -1){
            if(Game.getObjectById(harvestSource).ticksToRegeneration === null && creep.pos.roomName != creep.memory.harvestinfo.harvestsourelocation.roomName){
                var ticksToRegeneration = 0;
            }else{
                var ticksToRegeneration = Game.getObjectById(harvestSource).ticksToRegeneration;
            }
            if(ticksToRegeneration > 50 && creep.ticksToLive <= 1300 && creep.harvest(Game.getObjectById(harvestSource)) == ERR_NOT_ENOUGH_RESOURCES){
                creep.moveTo(creep.pos.findClosestByPath(FIND_MY_SPAWNS))
            //move to the harvest location otherwise
            }else if(creep.pos != harvestSourceLocation){
                creep.moveTo(harvestSourceLocation,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
            }
        }
	}
};

module.exports = roleDropHarvester;