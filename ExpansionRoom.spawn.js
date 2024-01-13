var buildScreeps = require('build.screeps');
var expansionRoomSpawn = {
    spawn: function(room){
        buildScreeps.buildExpansionCreep(room)
    }
}
module.exports = expansionRoomSpawn;