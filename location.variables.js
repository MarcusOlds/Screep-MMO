/*
NOT CURRENTLY BEING USED FOR ANYTHING
INTENDED FOR FUTURE IMPLEMENTATION
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
    assignHomeRoom: function(creep){
        creep.memory.homeRoom = creep.pos.roomName
    },
    assignRoomNumber: function(creep){
        switch(creep.memory.homeRoom){
            case 'W3S27':
                var roomNumber = 0;
                break;
            case 'W3S26':
                var roomNumber = 1;
                break;
        }
        creep.memory.homeRoomNumber = roomNumber
    },
    assignLocations: function(creep){
        homeRoom = creep.memory.homeRoom;
        roomNumber = creep.memory.homeRoomNumber;
        roleNumber = creep.memory.number;
        role = creep.memory.role;
        switch(role){
            case 'builder':
                break; 
            case 'claimer':
                break;
            case 'harvester':
            case 'drop harvester':
                switch(roomNumber){
                    case 0:
                        switch(roleNumber){
                            case 0:
                                creep.memory.workLocation = new RoomPosition(14,35,homeRoom);
                                creep.memory.workId = '5bbcacba9099fc012e636191';
                                creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                                break;
                            case 1:
                                creep.memory.workLocation = new RoomPosition(8,39,homeRoom);
                                creep.memory.workId = '5bbcacba9099fc012e636192';
                                creep.memory.idleLocation = new RoomPosition(25,25,homeRoom);
                                break;
                        }
                        break;
                    case 1:
                        switch(roleNumber){
                            case 0:
                                creep.memory.workLocation = new RoomPosition(35,31,homeRoom);
                                creep.memory.workId = '5bbcacba9099fc012e63618d';
                                creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                                break;
                        }
                }
                break;
            case 'mineral harvester':
                switch(roomNumber){
                    case 0:
                        switch(roleNumber){
                            case 0:
                                creep.memory.workLocation = new RoomPosition(37,36,homeRoom);
                                creep.memory.workId = '5bbcb2b940062e4259e93ced';
                                creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                                break;
                        }
                        break;
                    case 1:
                        switch(roleNumber){
                            case 0:
                                creep.memory.workLocation = new RoomPosition(44,12,homeRoom);
                                creep.memory.workId = '5bbcb2b940062e4259e93cec';
                                creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                                break;
                            case 1:
                                creep.memory.workLocation = new RoomPosition(43,12,homeRoom);
                                creep.memory.workId = '5bbcb2b940062e4259e93cec';
                                creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                                break;
                            case 2:
                                creep.memory.workLocation = new RoomPosition(43,11,homeRoom);
                                creep.memory.workId = '5bbcb2b940062e4259e93cec';
                                creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                                break;
                        }
                }
                break;
            case 'maintainer':
                break;
            case 'stocker':
                break;
            case 'upgrader':
                switch(roomNumber){
                    case 0:
                        creep.memory.workLocation = new RoomPosition(5,22,homeRoom);
                        creep.memory.workId = '5bbcacba9099fc012e636190';
                        creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                        break;
                    case 1:
                        creep.memory.workLocation = new RoomPosition(35,31,homeRoom);
                        creep.memory.workId = '5bbcacba9099fc012e63618e';
                        creep.memory.idleLocation = new RoomPosition(25,25, homeRoom);
                        break;
                }
        }
    }
}
module.exports = locations