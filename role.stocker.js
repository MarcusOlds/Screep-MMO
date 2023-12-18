var harvestTarget = require('harvest.target');
var processTargets = require('process.targets');
var roleStocker = {
    test: function(){
        console.log('test');
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        //if creep is empty capacity  
	    if(creep.store.getFreeCapacity() == creep.store.getCapacity() || creep.memory.pickingup) {
            //stop working
	        creep.memory.delivering = false;
            //start pickup
	        if(!(creep.memory.pickingup)){
	            creep.memory.pickingup = true;
	        }
            //find closest dropped resource as priority because they decay
	        var target = processTargets.findClosestDroppedResource(creep,50);
            if(target) {
                processTargets.pickupResource(creep,target);
            }
            //find closest ruin with resources
            if(!(target)){
                target = processTargets.findClosestRuinWithResources(creep);
                if(target) {
                    processTargets.withdrawResources(creep,target);
                }
            }
            //find teh closest tombstone with resources in it
            if(!(target)){
                target = processTargets.findClosestTombstoneWithResources(creep);
                if(target) {
                    processTargets.withdrawResources(creep,target);
                }
            }
            //find the closest container with resources in it
            if(!(target)){
                //if there is no dropped resources find a container with some energy in it
                var target = processTargets.findClosestContainerWithEnergy(creep,100);
                if(target){
                    processTargets.withdrawResources(creep,target);
                }
            }
            //if creep is full turn off pickingup
            if(creep.store.getFreeCapacity() == 0){
                creep.memory.delivering = true;
                creep.memory.pickingup = false;
            }
        //if creep is not empty and not set to picking up
        }else{
            //set creep to delivering
            creep.memory.harvestinfo.pickingup = false;
            creep.memory.delivering = true;

            //check if creep has minerals to deposit
            if(creep.store.getUsedCapacity(_.findKey(creep.store)) && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                //find closest storage
                var target = processTargets.findClosestStorageWithSpace(creep);
            };

            //if there is a target transfer to or move towards the target
            if(target) {
                processTargets.TransferResource(creep,target);
            }
            //roll switch
            if(!(target)){
                switch(creep.memory.subrole){
                    case 'tower':
                        //find empty towers
                        var target = processTargets.findClosestTower(creep);
                        if(target) {
                            processTargets.TransferResource(creep,target);
                        }
                        break;
                    case 'storage':
                        //role for storage
                        var target = processTargets.findClosestStorageWithSpace(creep);
                        if(target) {
                            processTargets.TransferResource(creep,target);
                        }
                        break;
                    case 'extension':
                        var target = processTargets.findClosestExtensionOrSpawn(creep);
                        if(target) {
                            processTargets.TransferResource(creep,target);
                        }
                        break;
                }
            }


        }
	}
};

module.exports = roleStocker;