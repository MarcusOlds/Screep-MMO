//has been set to drop in nearest container
var harvestTarget = require('harvest.target');
var roleHarvester = {

    /** @param {Creep} creep **/
    //none drop harvester style harvester....I do not not use this anymore
    run: function(creep) {
        
	    if(creep.store.getUsedCapacity() == 0) {
	        creep.memory.depositing = false;
	        if(!(creep.memory.harvestinfo.harvesting)){
	            harvestTarget.run(creep);
	        }
	    }
	    if(creep.store.getFreeCapacity() == 0){
	        creep.memory.depositing = true;
	        creep.memory.harvestinfo.harvesting = false;
	    }
        
        if (creep.memory.harvestinfo.harvesting && creep.store.getFreeCapacity() > 0){
            if(creep.memory.harvestinfo.harvestsource != -1){
                var harvestSourceLocation = new RoomPosition(creep.memory.harvestinfo.harvestsourcelocation.x,creep.memory.harvestinfo.harvestsourcelocation.y,creep.memory.harvestinfo.harvestsourcelocation.roomName);
                if(creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_NOT_IN_RANGE || 
                creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_NOT_FOUND || 
                creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_INVALID_TARGET && 
                creep.memory.harvestinfo.harvesting) {
                    creep.moveTo(harvestSourceLocation ,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                }else{
                    var workparts = creep.getActiveBodyparts(WORK);
                    creep.memory.harvestinfo.totalHarvested = (2 * workparts) + creep.memory.harvestinfo.totalHarvested
                }
            }
        }
        
        if(creep.memory.depositing && creep.store[RESOURCE_ENERGY] > 0){
            creep.memory.harvestinfo.harvesting = false;
            creep.memory.depositing = true;
            //if (creep.room.name != 'E43N52'){
            //    creep.moveTo(Game.flags['Home Base Left Entry'], {visualizePathStyle: {stroke: '#ffaa00'}})
            //}
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_CONTAINER || 
                                structure.structureType == STRUCTURE_STORAGE)  && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                }
            }
        }
	}
};

module.exports = roleHarvester;