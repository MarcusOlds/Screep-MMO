//required modules
var processTarget = require('process.targets');
var harvestTarget = require('harvest.target');
var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //creep is building but runs out of resources so set building to false
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
	        creep.memory.building = false;
            creep.say('🔄 Empty');
	    }
	    //creep is mining or picking up but is full
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
            //terrible terrible logic, needs to be fixed but have higher priorities
            if(!(target)){
                if(!(creep.memory.targetRoom)){
                    if(creep.pos.roomName == 'W3S26'){
                        var targetRoom = new RoomPosition (22, 28, 'W3S27');
                        creep.memory.targetRoom = targetRoom
                    }else if(creep.pos.roomName == 'W3S27'){
                        var targetRoom = new RoomPosition (25, 25, 'W3S28');
                        creep.memory.targetRoom = targetRoom;
                        //creep.moveTo(new RoomPosition(25,25,'W2S26'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W3S28'){
                        var targetRoom = new RoomPosition (37, 24, 'W3S29');
                        creep.memory.targetRoom = targetRoom
                        //creep.moveTo(new RoomPosition(25,25,'W3S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W3S29'){
                        var targetRoom = new RoomPosition (24, 2, 'W2S29');
                        creep.memory.targetRoom = targetRoom
                        //creep.moveTo(new RoomPosition(25,25,'W3S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W2S29'){
                        var targetRoom = new RoomPosition (28, 25, 'W3S26');
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
                    //if you are in the right room delete the room target to start working on construction
                    if(creep.memory.targetRoom.roomName == creep.pos.roomName && creep.pos.x == creep.memory.targetRoom.x && creep.pos.y == creep.memory.targetRoom.y){
                        delete creep.memory.targetRoom;
                    //otherwise keep moving towards the targeted room
                    }else{
                        var targetRoom = new RoomPosition(creep.memory.targetRoom.x, creep.memory.targetRoom.y, creep.memory.targetRoom.roomName)
                        creep.moveTo(targetRoom,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }
                //if creep is not looking for a room, then just do some work
                }else{
                    var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    if(target){
                        if(creep.build(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                        }
                    }
                }
            //if you do have a target, get to work!
            }else{
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target){
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                    }
                }
            }
        //while creep is not building and looking for energy
	    }else {
            creep.memory.pickingup = true;
	        //if creep is not building check for storage with enough energy to fill up creep
            var targetContainer = processTarget.findClosestStorageWithEnergy(creep,creep.store.getFreeCapacity());
            //if not storage available then check for containers with space
            if(!(targetContainer)){
                var targetContainer = processTarget.findClosestContainerWithEnergy(creep,50);
            }
            if(!(targetContainer)){
                var targetContainer = processTarget.findClosestRuinWithResources(creep,5);
            }
            if(!(targetContainer)){
                var target = processTarget.findClosestDroppedEnergy(creep,5);
                if(target){
                    processTarget.pickupResource(creep,target);
                }
            }
            if(!(targetContainer)){
                if(!(creep.memory.targetRoom)){
                    if(creep.pos.roomName == 'W3S26'){
                        var targetRoom = new RoomPosition (37, 24, 'W2S29');
                        creep.memory.targetRoom = targetRoom
                    }else if(creep.pos.roomName == 'W3S27'){
                        var targetRoom = new RoomPosition (25, 25, 'W3S26');
                        creep.memory.targetRoom = targetRoom;
                        //creep.moveTo(new RoomPosition(25,25,'W2S26'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W3S28'){
                        var targetRoom = new RoomPosition (22, 28, 'W3S27');
                        creep.memory.targetRoom = targetRoom
                        //creep.moveTo(new RoomPosition(25,25,'W3S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W3S29'){
                        var targetRoom = new RoomPosition (24, 2, 'W2S29');
                        creep.memory.targetRoom = targetRoom
                        //creep.moveTo(new RoomPosition(25,25,'W3S27'),{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }else if(creep.pos.roomName == 'W2S29'){
                        var targetRoom = new RoomPosition (25, 25, 'W3S29');
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
                    //if you are in the right room delete the room target to start working on construction
                    if(creep.memory.targetRoom.roomName == creep.pos.roomName && creep.pos.x == creep.memory.targetRoom.x && creep.pos.y == creep.memory.targetRoom.y){
                        delete creep.memory.targetRoom;
                    //otherwise keep moving towards the targeted room
                    }else{
                        var targetRoom = new RoomPosition(creep.memory.targetRoom.x, creep.memory.targetRoom.y, creep.memory.targetRoom.roomName)
                        creep.moveTo(targetRoom,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
                    }
                //if creep is not looking for a room, then just do some work
                }
            //if you do have a target, get to work!
            }
            //if a target was found withdraw or move to the storage
            if (creep.memory.pickingup){
                processTarget.withdrawEnergy(creep,targetContainer);
                //if there are no full containers
            }
            //check if its full after and set to no longer picking up if it is
            if(creep.store.getFreeCapacity == 0){
                creep.memory.pickingup = false;
            }
	    }
	}
};

module.exports = roleBuilder;