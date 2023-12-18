var harvestTarget = require('harvest.target');
var getTarget = require('process.targets');
var roleUpgrader = {

    run: function(creep) {

        
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvestinfo.harvesting = false;
            creep.memory.pickingup = true;
            creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.memory.homeroom == creep.pos.roomName){
                if(creep.upgradeController(Game.getObjectById(creep.memory.controllerid)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.controllerid) ,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                }
            }else{
                creep.moveTo(new RoomPosition(25,25,creep.memory.homeroom));
            }
            //}
        } else {
            //check for dropped resources
            var target = getTarget.findClosestDroppedResource(creep,1);
            if(target){
                getTarget.pickupResource(creep,target);
            };
	        //if creep is not upgrading check for full containers
            var targetContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE || 
                        structure.structureType == STRUCTURE_CONTAINER) && 
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targetContainer){
                creep.memory.harvestinfo.targetContainer = targetContainer.id;
                creep.memory.pickingup = true;
            }
            if (creep.memory.pickingup){
                if(creep.withdraw(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetContainer,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                }else{
                    if(creep.store.getFreeCapacity == 0){
                        creep.memory.pickingup = false;
                    }
                }
                //if there are no full containers
            }
        }
	}
};

module.exports = roleUpgrader;