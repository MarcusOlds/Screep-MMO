var harvestTarget = require('harvest.target');
var processTarget = require('process.targets');

var roleMaintainer = {
    /** @param {Creep} creep **/
    run: function(creep, wallStrengthGoal, rampartStengthGoal) {
        if(creep.pos.roomName == creep.memory.homeroom){
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
                    filter: (structure) => (((structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) && structure.hits < structure.hitsMax) || 
                                            ((structure.structureType == STRUCTURE_WALL && structure.hits < wallStrengthGoal && structure.hits != structure.hitsMax) ||
                                            (structure.structureType == STRUCTURE_RAMPART && structure.hits < rampartStengthGoal && structure.hits != structure.hitsMax)))
                });
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
                if(!targetContainer){
                    var targetContainer = processTarget.findClosestContainerWithEnergy(creep,5);
                }
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
        }else{
            var room = new RoomPosition(25,25,creep.memory.homeroom)
            creep.moveTo(room, {reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
        }
	}
};

module.exports = roleMaintainer;