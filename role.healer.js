var roleHealer = {
    run: function(creep){
        var attackZone = new RoomPosition(13,5,'W3S30');
        if(creep.pos.roomName != attackZone.roomName){
            creep.moveTo(attackZone,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
        }else{
            var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (creep) => creep.hits < creep.hitsMax});
            if(target){
                if(creep.heal(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target,{reusePath: 10, visualizePathStyle: {stroke: '#FFF', lineStyle: 'solid', opacity: 1.0}});
                }
            }
        }
    }
}

module.exports = roleHealer;