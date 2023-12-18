/*
the point of this module is to assign important locations to the memory of a screep depending on their role and their assigned number for that role
this is intended to be a permanent assignment for the life of a screep.
Each screep I am thinking will have three variables in mem at build time
memory.role = string
memory.number = int
memory.needsAssignment = bool (This will start as true and switch once assignment below is made)
if a creep ages out its number will be recycled.
These are the common parameters for all creeps even if not need 100% of the time (ex: A builder is grabbing from containers but having an assigned container is effecient for distribution of capacity);
So the workLocation 
homeRoom = RoomPosition
workLocation = RoomPosition
workId = String Containing ObjectID
idleLocation = RoomPosition
 */
var locations = {
    run: function(creep){
        if(creep.memory.needsAssignment){
            //for now only one homeroom
            creep.memory.homeRoom = 'W2S27';
            switch(creep.memory.role){
                case 'builder':
                    break; 
                case 'claimer':
                    break;
                case 'harvester':
                case 'drop harvester':
                    switch(creep.memory.number){
                        case 1:
                            creep.memory.workLocation = new RoomPosition(14,35,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636191';
                            creep.memory.idleLocation = new RoomPosition(25,25, creep.memory.homeRoom);
                            break;
                        case 2:
                            creep.memory.workLocation = new RoomPosition(8,39,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636192';
                            creep.memory.idleLocation = new RoomPosition(25,25,creep.memory.homeRoom);
                            break;
                        case 3:
                            creep.memory.workLocation = new RoomPosition(7,39,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636192';
                            creep.memory.idleLocation = new RoomPosition(25,25,creep.memory.homeRoom);
                            break;
                    }
                    break;
                case 'maintainer':
                    break;
                case 'stocker':
                    break;
                case 'upgrader':
                    switch(creep.memory.number){
                        case 1:
                            creep.memory.workLocation = new RoomPosition(4,17,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636190';
                            creep.memory.idleLocation = new RoomPosition(25,25, creep.memory.homeRoom);
                            break;
                        case 2:
                            creep.memory.workLocation = new RoomPosition(4,18,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636190';
                            creep.memory.idleLocation = new RoomPosition(25,25,creep.memory.homeRoom);
                            break;
                        case 3:
                            creep.memory.workLocation = new RoomPosition(4,19,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636190';
                            creep.memory.idleLocation = new RoomPosition(25,25,creep.memory.homeRoom);
                            break;
                        case 4:
                            creep.memory.workLocation = new RoomPosition(4,20,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636190';
                            creep.memory.idleLocation = new RoomPosition(25,25,creep.memory.homeRoom);
                            break;
                        case 5:
                            creep.memory.workLocation = new RoomPosition(4,21,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636190';
                            creep.memory.idleLocation = new RoomPosition(25,25,creep.memory.homeRoom);
                            break;
                        case 6:
                            creep.memory.workLocation = new RoomPosition(4,22,'W3S27');
                            creep.memory.workId = '5bbcacba9099fc012e636190';
                            creep.memory.idleLocation = new RoomPosition(25,25,creep.memory.homeRoom);
                            break;
                    }
            }
        }
    }
}
module.exports = locations