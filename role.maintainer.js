var harvestTarget = require('harvest.target');
var processTarget = require('process.targets');

var roleMaintainer = {
    /** @param {Creep} creep **/
    run: function(creep, wallStrengthGoal, rampartStengthGoal) {
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
	        creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.memory.harvestinfo.harvesting = false;
	        creep.memory.pickingup = false;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {

            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (((structure.structureType != STRUCTURE_WALL && 
                                        structure.structureType != STRUCTURE_RAMPART) && 
                                        structure.hits < structure.hitsMax) || 
                                        ((structure.structureType == STRUCTURE_WALL && 
                                        structure.hits < wallStrengthGoal) ||
                                        (structure.structureType == STRUCTURE_RAMPART &&
                                        structure.hits < rampartStengthGoal)))
            });
            if(!(closestDamagedStructure)){
                if(creep.pos.roomName == 'W3S27'){
                    creep.moveTo(new RoomPosition(25,25,'W3S26'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                }else if(creep.pos.roomName == 'W3S26'){
                    creep.moveTo(new RoomPosition(25,25,'W2S26'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                }else if(creep.pos.roomName == 'W2S26'){
                    creep.moveTo(new RoomPosition(25,25,'W2S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                }else if(creep.pos.roomName == 'W2S27'){
                    creep.moveTo(new RoomPosition(25,25,'W3S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                }else{
                    var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => (((structure.structureType != STRUCTURE_WALL && 
                                                structure.structureType != STRUCTURE_RAMPART) && 
                                                structure.hits < structure.hitsMax) || 
                                                ((structure.structureType == STRUCTURE_WALL && 
                                                structure.hits < wallStrengthGoal) ||
                                                (structure.structureType == STRUCTURE_RAMPART &&
                                                structure.hits < rampartStengthGoal)))
                    });
                    if(closestDamagedStructure) {
                        if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE){
                            creep.moveTo(closestDamagedStructure,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                        };
                    }
                }
            }else
            if(closestDamagedStructure) {
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestDamagedStructure,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                };
            }
	    }
	    else {
            var target = processTarget.findClosestDroppedResource(creep,50);
            if(target){
                processTarget.pickupResource(creep,target);
            };
	        //if creep is not building check for full containers
            var targetContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE)  && 
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
            }/*else if(!(creep.memory.harvestinfo.harvesting)){
	            harvestTarget.run(creep);
	        }
            if(creep.memory.harvestinfo.harvestsource != -1){
                harvestSourceLocation = new RoomPosition(creep.memory.harvestinfo.harvestsourcelocation.x,creep.memory.harvestinfo.harvestsourcelocation.y,creep.memory.harvestinfo.harvestsourcelocation.roomName);
                if(creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_NOT_IN_RANGE || 
                    creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_NOT_FOUND || 
                    creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_INVALID_TARGET && 
                    creep.memory.harvestinfo.harvesting) {
                        creep.moveTo(harvestSourceLocation , {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }*/
	    }
	}
};

module.exports = roleMaintainer;