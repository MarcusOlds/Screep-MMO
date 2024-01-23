//has been set to drop in nearest container
var processTargets = require('process.targets');
var roleExpansionHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //set variables
        depositRoom = Game.spawns[Memory.ExpansionCreeps.spawnName].pos.roomName;
        miningRoom = creep.memory.homeroom;
        currentRoom = creep.pos.roomName;

        //set harvesting
        if(creep.store.getUsedCapacity() == 0 && creep.memory.harvestinfo.harvesting == false) {
            creep.memory.depositing = false;
            creep.memory.harvestinfo.harvesting = true;
        }
        //set depositing
        if(creep.store.getFreeCapacity() == 0){
            creep.memory.depositing = true;
            creep.memory.harvestinfo.harvesting = false;
        }

        //depositing Behavior
        if(creep.memory.depositing){
            //if the creep is not in the depositing room move to it
            if(currentRoom != depositRoom){
                var room = new RoomPosition(25,25,depositRoom)
                creep.moveTo(room, {reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
            //if the creep is in the depositing room then find a terminal
            }else{
                var target = processTargets.findClosestLink(creep);
                //if no terminal find a storage location
                if(!target){
                    var target = processTargets.findClosestStorageWithSpace(creep);
                }
                //if a target was found then transfer the resources to it
                if(target){
                    processTargets.TransferResource(creep,target);
                }
            }
        }

        //harvesting Behavior
        if(creep.memory.harvestinfo.harvesting){
            if(currentRoom != miningRoom){
                var room = new RoomPosition(25,25,miningRoom)
                creep.moveTo(room, {reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
            }else{
                //find room resource and mine it
                var target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(target){
                    processTargets.harvestResource(creep,target);
                }
            }
        }
	}
};

module.exports = roleExpansionHarvester;