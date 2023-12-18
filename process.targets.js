var getTarget = {
    //Find dropped resources
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

    //find storage with energy in it
    findClosestStorageWithSpace: function(object){
        var target = object.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) && 
                        structure.store.getFreeCapacity() > 0;
            }
        });
        return target;
    },

    //find tombstone with resources
    findClosestTombstoneWithResources: function(object){
        target = object.pos.findClosestByPath(FIND_TOMBSTONES, {filter: (tombstones) => {
            return(tombstones.store.getUsedCapacity(_.findKey(tombstones.store)) > 0)
        }});
        return target;
    },

    //Find ruins with resources
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

    findClosestTower: function(object){
        var target = object.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        }); 
        return target;
    },

    pickupResource: function(creep, target){
        if (creep.pickup(target) == ERR_NOT_IN_RANGE){
            creep.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        };
    },

    withdrawResources: function(creep,target){
        if (creep.withdraw(target,_.findKey(target.store)) == ERR_NOT_IN_RANGE){
            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        };
    },

    withdrawEnergy: function(creep,target){
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }
    },

    TransferResource: function(creep,target){
        if(creep.transfer(target, _.findKey(creep.store)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }
    }

};
module.exports = getTarget;