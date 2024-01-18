var buildScreeps = require('build.screeps');
var highwayRoomSpawn = {
    spawn: function(room){
        buildScreeps.buildHighwayCreep(room)
    }
}
module.exports = highwayRoomSpawn;