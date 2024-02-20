var harvestTarget = require('harvest.target');
var processTargets = require('process.targets');
var roleStocker = {
    setToDelivering: function(creep){
        creep.memory.delivering = true;
        creep.memory.pickingup = false;
        creep.memory.stockingterminal = false;
        creep.memory.stockingfactory = false;
    },
    setToPickingUp: function(creep){
        creep.memory.delivering = false;
        creep.memory.pickingup = true;
        creep.memory.stockingterminal = false;
        creep.memory.stockingfactory = false;
    },
    setToStockingTerminal: function(creep){
        creep.memory.delivering = false;
        creep.memory.pickingup = false;
        creep.memory.stockingfactory = false;
        creep.memory.stockingterminal = true;       
    },
    setToStockingFactory: function(creep){
        creep.memory.delivering = false;
        creep.memory.pickingup = false;
        creep.memory.stockingterminal = false;
        creep.memory.stockingfactory = true;
    },
    setTask: function(creep){
        //delivering
        if(creep.store.getFreeCapacity() == 0){
            this.setToDelivering(creep);
        }
        //pickup
        if(creep.store.getUsedCapacity() == 0){
            this.setToPickingUp(creep);
        }
        if(!(creep.memory.delivering) && !(creep.memory.pickingup) && !(creep.memory.stockingterminal) && !(creep.memory.stockingfactory)){
            this.setToPickingUp(creep);
        }
    },


    /** @param {Creep} creep **/
    run: function(creep) {
        //check if in home room or if the creep is delivering but from an expansion room
        if(creep.pos.roomName == creep.memory.homeroom || (creep.memory.expansioncreep == true && creep.memory.delivering == true)){
            if(creep.memory.expansioncreep == true && creep.memory.delivering == true && creep.pos.roomName != "W3S27"){
                var room = new RoomPosition(25,25,"W3S27")
                creep.moveTo(room, {reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
            }else if(creep.memory.expansioncreep == true && creep.memory.delivering == true && creep.pos.roomName == "W3S27" && creep.store.getUsedCapacity() > 0){
                target = processTargets.findClosestLink(creep);
                if(target){
                    processTargets.TransferResource(creep,target);
                }
            }else{
                //set the task
                if(!(creep.memory.stockingterminal) && !(creep.memory.stockingfactory)){
                    this.setTask(creep);
                }


                //pickingup
                if(creep.memory.pickingup) {
                    switch(creep.memory.subrole){
                        case 'storage':
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
                            //find the closest tombstone with resources in it
                            if(!(target)){
                                target = processTargets.findClosestTombstoneWithResources(creep);
                                if(target) {
                                    processTargets.withdrawResources(creep,target);
                                }
                            }
                            //find closest link with energy in it
                            if(!(target)){
                                var target = processTargets.findClosestLinkWithEnergy(creep,50);
                                if(target){
                                    processTargets.withdrawResources(creep,target);
                                }
                            }
                            //find the closest container with energy in it
                            if(!(target)){
                                //if there is no dropped resources find a container with some energy in it
                                var target = processTargets.findClosestContainerWithEnergy(creep,100);
                                if(target){
                                    processTargets.withdrawResources(creep,target);
                                }
                            }
                            //find the closest container with resources in it
                            if(!(target)){
                                //if there is no dropped resources find a container with some energy in it
                                var target = processTargets.findClosestContainerWithResource(creep,1000);
                                if(target){
                                    processTargets.withdrawResources(creep,target);
                                }
                            }
                            //Empty Extra Energy From Terminal
                            if(!(target)){
                                var target = processTargets.findTerminalWithOverEnergy(creep);
                                if(target){
                                    processTargets.withdrawAResource(creep,target,RESOURCE_ENERGY);
                                }
                            }
                            if(!(target)){
                                //stocking factory with Resource
                                roomResource = processTargets.getRoomResource(creep);
                                factory = processTargets.findFactory(creep);
                                storage = processTargets.findClosestStorageWithAResource(creep,500,roomResource);
                                if(storage && factory){
                                    this.setToStockingFactory(creep);
                                    target = "found"
                                }
                            }
                            if(!(target)){
                                //stockingTerminal
                                roomResource = processTargets.getRoomResource(creep);
                                terminal = processTargets.findTerminal(creep);
                                storage = processTargets.findClosestStorageWithAResource(creep,500,roomResource);
                                if(storage){
                                    this.setToStockingTerminal(creep);
                                }
                            }
                            break;
                        case 'tower':
                        case 'extension':
                            var target = processTargets.findClosestDroppedResource(creep,50);
                            if(target) {
                                processTargets.pickupResource(creep,target);
                            }
                            var target = processTargets.findClosestStorageWithEnergy(creep,100);
                            if(!(target)){
                                target = processTargets.findClosestRuinWithResources(creep);
                            }
                            if(target){
                                processTargets.withdrawResources(creep,target);
                            }
                    }
                //if creep is not empty and not set to picking up
                }
                if(creep.memory.stockingterminal){
                    //get the mats
                    resource = processTargets.getRoomResource(creep);
                    if(creep.store.getUsedCapacity(resource) == 0){
                        var target = processTargets.findClosestStorageWithAResource(creep,1000,resource)
                        if(target){
                            processTargets.withdrawAResource(creep,target,resource);
                        }else{
                            creep.memory.stockingterminal = false;
                        }
                    }else{
                        var target = processTargets.findTerminal(creep)
                        if(target){
                            processTargets.TransferAResource(creep,target,resource);
                        }
                    }
                    //var target = processTargets.findClosestStorageWithAResource(creep,1000,resource)
                    //if(!(target)){
                    //    creep.memory.stockingterminal = false;
                    //}
                }
                if(creep.memory.stockingfactory){
                    //get the mats
                    resource = processTargets.getRoomResource(creep);
                    if(creep.store.getUsedCapacity(resource) == 0){
                        var target = processTargets.findClosestStorageWithAResource(creep,500,resource)
                        if(target){
                            processTargets.withdrawAResource(creep,target,resource);
                        }else{
                            creep.memory.stockingfactory = false;
                        }
                    }else{
                        console.log(JSON.stringify(target))
                        var target = processTargets.findFactory(creep)
                        if(target){
                            processTargets.TransferAResource(creep,target,resource);
                        }
                        if(creep.store.getUsedCapacity(resource)==0){
                            creep.memory.stockingfactory = false;
                        }
                    }
                }
                if(creep.memory.delivering){
                    //check if creep has minerals to deposit
                    if(creep.store.getUsedCapacity(_.findKey(creep.store)) && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                        //find closest storage
                        var target = processTargets.findClosestStorageWithSpace(creep);
                    };

                    //if there is a target transfer to or move towards the target
                    if(target) {
                        processTargets.TransferResource(creep,target);
                    }
                    //role switch
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
            
        }else{
            var room = new RoomPosition(25,25,creep.memory.homeroom)
            creep.moveTo(room, {reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}})
        }
	}
};

module.exports = roleStocker;