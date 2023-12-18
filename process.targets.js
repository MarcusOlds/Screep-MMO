var getTarget = {
    //Find dropped resources and return the closest
    findClosestDroppedResource: function(object, minAmount){
        var target = object.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (resource) => {
            return(resource.amount >= minAmount);
        }});
        return target;
    },

    //find container with energy in it
    findClosestContainerWithEnergy: function(object, minAmount){
        var target = object.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)  && 
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > minAmount;
            }
        });
        return target;
    },

    //find storage with free space
    findClosestStorageWithSpace: function(object){
        var target = object.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) && 
                        structure.store.getFreeCapacity() > 0;
            }
        });
        return target;
    },

    findClosestStorageWithEnergy: function(object, minAmount){
        var target = object.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) && 
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > minAmount;
            }
        });
        return target;
    },

    //find tombstone with resources in them
    findClosestTombstoneWithResources: function(object){
        target = object.pos.findClosestByPath(FIND_TOMBSTONES, {filter: (tombstones) => {
            return(tombstones.store.getUsedCapacity(_.findKey(tombstones.store)) > 0)
        }});
        return target;
    },

    //Find ruins with resources in them
    findClosestRuinWithResources: function(object){
        var target = object.pos.findClosestByPath(FIND_RUINS, {filter: (ruins) => {
            return(ruins.store.getUsedCapacity(_.findKey(ruins.store)) > 0)
        }});
        return target;
    },

    //find extensions or spawns that are not full
    findClosestExtensionOrSpawn: function(object){
        var target = object.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || 
                    structure.structureType == STRUCTURE_SPAWN) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        return target;
    },

    //find the closest tower that has free space for energy
    findClosestTower: function(object){
        var target = object.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        }); 
        return target;
    },

    //send creep to pickup from a target
    pickupResource: function(creep, target){
        if (creep.pickup(target) == ERR_NOT_IN_RANGE){
            creep.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        };
    },

    //send creep to withdraw any resource from a target
    withdrawResources: function(creep,target){
        if (creep.withdraw(target,_.findKey(target.store)) == ERR_NOT_IN_RANGE){
            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        };
    },

    //send creep to withdraw energy from a target
    withdrawEnergy: function(creep,target){
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }
    },

    //send creep to transfer all resources to a target
    TransferResource: function(creep,target){
        if(creep.transfer(target, _.findKey(creep.store)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }
    }

};
module.exports = getTarget;