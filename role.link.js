var roleLink = {
    isDestinationLink: function(linkID) {
        switch (linkID) {
            case '65a1b036274b8e9d56d7ac20':
                return true;
        }
        return false;
	},
    findTargetDestinationLink: function(linkID){
        room = Game.getObjectById(linkID).pos.roomName
        switch (room){
            case 'W3S27':
                return Game.getObjectById('65a1b036274b8e9d56d7ac20');
        }
    },

    run: function(linkID){
        //check if link is Source or Destination
        var isDestination = this.isDestinationLink(linkID)
        if(!isDestination){
            var link = Game.getObjectById(linkID);
            var target = this.findTargetDestinationLink(linkID)
            if(link.store.getUsedCapacity(RESOURCE_ENERGY) == link.store.getCapacity(RESOURCE_ENERGY) && target.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                link.transferEnergy(target);
            }
        }
    }
};

module.exports = roleLink;