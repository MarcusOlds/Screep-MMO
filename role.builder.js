//has been set to use containers instead of harvesting
var processTarget = require('process.targets');
var harvestTarget = require('harvest.target');
var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //creep is building but runs our of resources
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
	        creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    //creep is mining but is full
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
            creep.memory.pickingup = false;
	        creep.memory.harvestinfo.harvesting = false;
	        creep.say('🚧 build');
	    }
        
        //while creep is building 
	    if(creep.memory.building == true) {
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            //if no targets move to another room to look for a construction site
            if(!(target)){
                if(!(creep.memory.targetRoom)){
                    if(creep.pos.roomName == 'W3S27'){
                        var targetRoom = new RoomPosition (35, 34, 'W3S26');
                        creep.memory.targetRoom = targetRoom
                    }else if(creep.pos.roomName == 'W3S26'){
                        var targetRoom = new RoomPosition (30, 31, 'W2S26');
                        console.log(JSON.stringify(targetRoom));
                        creep.memory.targetRoom = targetRoom;
                        console.log(JSON.stringify(creep.memory.targetRoom));
                        //creep.moveTo(new RoomPosition(25,25,'W2S26'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W2S26'){
                        var targetRoom = new RoomPosition (8, 12, 'W2S27');
                        creep.memory.targetRoom = targetRoom
                        //creep.moveTo(new RoomPosition(25,25,'W2S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W2S27'){
                        var targetRoom = new RoomPosition (28, 25, 'W3S27');
                        creep.memory.targetRoom = targetRoom
                        //creep.moveTo(new RoomPosition(25,25,'W3S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }
                }
                /*
                if(creep.memory.targetRoom){
                    delete creep.memory.targetRoom;
                }
                */
                //if moving rooms to find a construction site
                if(creep.memory.targetRoom){
                    //console.log(JSON.stringify(new RoomPosition(25,25,'W3S27')))
                    //console.log(JSON.stringify(creep.memory.targetRoom))
                    //if you are in teh right room delete the room target to start working on construction
                    if(creep.memory.targetRoom.roomName == creep.pos.roomName && creep.pos.x == creep.memory.targetRoom.x && creep.pos.y == creep.memory.targetRoom.y){
                        delete creep.memory.targetRoom;
                    //otherwise keep moving towards the targeted room
                    }else{
                        var targetRoom = new RoomPosition(creep.memory.targetRoom.x, creep.memory.targetRoom.y, creep.memory.targetRoom.roomName)
                        creep.moveTo(targetRoom,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }
                //if creep is not looking for a room, then just do some work
                }else{
                    var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(target){
                        if(creep.build(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                        }
                    }
                }
            //if you do have a target, get to work!
            }else{
                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(target){
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    }
                }
            }
        //while creep is not building and looking for energy
	    }else {
            var target = processTarget.findClosestDroppedResource(creep,50);
            if(target){
                processTarget.pickupResource(creep,target);
            };
	        //if creep is not building check for full containers
            var targetContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) && 
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
                }
                if(creep.store.getFreeCapacity == 0){
                    creep.memory.pickingup = false;
                }
                //if there are no full containers
            }else {
                if(!(creep.memory.harvestinfo.harvesting)){
                    harvestTarget.run(creep);
                    creep.memory.pickingup = false;
                }
                if(creep.memory.harvestinfo.harvestsource != -1){
                    harvestSourceLocation = new RoomPosition(creep.memory.harvestinfo.harvestsourcelocation.x, creep.memory.harvestinfo.harvestsourcelocation.y, creep.memory.harvestinfo.harvestsourcelocation.roomName)
                    if(creep.memory.harvestinfo.harvestsource == -1 && creep.memory.harvestinfo.harvesting){
                        creep.moveTo(harvestSourceLocation,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    } else if(creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_NOT_IN_RANGE || 
                        creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_NOT_FOUND || 
                        creep.harvest(Game.getObjectById(creep.memory.harvestinfo.harvestsourceid)) == ERR_INVALID_TARGET && 
                        creep.memory.harvestinfo.harvesting) {
                            creep.moveTo(harvestSourceLocation,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    }
                }
            }
	    }
	}
};

module.exports = roleBuilder;