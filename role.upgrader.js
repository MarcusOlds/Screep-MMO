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
            var target = getTarget.findClosestDroppedResource(creep,100);
            if(target){
                getTarget.pickupResource(creep,target);
            };
	        //if creep is not upgrading check for full containers
            if(!(target)){
                var targetContainer = getTarget.findClosestStorageWithEnergy(creep,50);
                if(targetContainer){
                    getTarget.withdrawEnergy(creep,targetContainer);
                }
                //switch away from picking up if full
                if(creep.store.getFreeCapacity == 0){
                    creep.memory.pickingup = false;
                }
            }
        }
	}
};

module.exports = roleUpgrader;