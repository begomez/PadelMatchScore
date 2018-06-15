//////////////////////////////////////////////////////////////
// Web sql library
//////////////////////////////////////////////////////////////
var TABLE_NAMES = ["PadelPlayers", "PadelMatches", "PadelScores"];
var INDEX_TABLE_PLAYER = 0;
var INDEX_TABLE_MATCH = 1;
var INDEX_TABLE_SCORE = 2;

var DB_NAME = "padel_db";
var DB_VERSION = 1;
var DB_DISPLAY = "padel_test_db";
var DB_SIZE = 2 * 1024 * 1024;

var ALL_MATCHES = 0;

var MAX_NUM_MATCHES = 10;


function prepareRepository() {
    var db = getRepository();
    createRepositoryTables(db);

    logMessage("Repo prepared...");
}

function truncateRepository() {
    var db = getRepository();
    truncateRepositoryData(db);
    dropRepositoryTables(db);
    createRepositoryTables(db);

    logMessage("Repo truncated...")
}

function getRepository() {
    return openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY, DB_SIZE);
}

function truncateRepositoryData(db) {
    for (var i = 0; i < TABLE_NAMES.length; i++) {
        //logMessage("Truncating " + TABLE_NAMES[i]);

        db.transaction(
            function(t) {
                t.executeSql(
                    "DELETE FROM " + TABLE_NAMES[i],
                    [],
                    onSuccess("Truncated... "),
                    onError()
                );
            }
        );
    }
}

function dropRepositoryTables(db) {
    for (var i = 0; i < TABLE_NAMES.length; i++) {
        //logMessage("Dropping " + TABLE_NAMES[i]);

        db.transaction(
            function(t) {
                t.executeSql(
                    "DROP TABLE IF EXISTS " + TABLE_NAMES[i],
                    [],
                    onSuccess("Dropped... "),
                    onError()
                );
            }
        );
    }
}

function createRepositoryTables(db) {
    db.transaction(
        function(t) {
            t.executeSql(
                "CREATE TABLE IF NOT EXISTS " + TABLE_NAMES[INDEX_TABLE_PLAYER] + "(id INTEGER PRIMARY KEY, name TEXT, timestamp DATETIME)",
                [],
                function(tx, sql_res) {
                    logMessage("Created table " + TABLE_NAMES[INDEX_TABLE_PLAYER]);
                },
                onError               
            );
        }
    );

    db.transaction(
        function(t) {
            t.executeSql(
                "CREATE TABLE IF NOT EXISTS " + TABLE_NAMES[INDEX_TABLE_MATCH] + "(id INTEGER PRIMARY KEY, localPlayer INTEGER, visitorPlayer INTEGER, timeIni DATETIME, timeEnd DATETIME, summary TEXT, lat NUMBER DEFAULT 0.0, long NUMBER DEFAULT 0.0)",
                [],
                function(tx, sql_res) {
                    logMessage("Created table " + TABLE_NAMES[INDEX_TABLE_MATCH]);
                },
                onError
                );
            }
        );

    db.transaction(
        function(t) {
            t.executeSql(
                "CREATE TABLE IF NOT EXISTS " + TABLE_NAMES[INDEX_TABLE_SCORE] + "(id INTEGER PRIMARY KEY, points INTEGER DEFAULT 0, set1 INTEGER DEFAULT 0, set2 INTEGER DEFAULT 0, set3 INTEGER DEFAULT 0, playerId INTEGER DEFAULT 0, matchId INTEGER DEFAULT 0, timestamp DATETIME)",
                [],
                function(tx, sql_res) {
                    logMessage("Created table " + TABLE_NAMES[INDEX_TABLE_SCORE]);
                },
                onError
            );
        }
    );
}

function onSuccess(msg) {
    logMessage("DB success " + msg);
}

function onError() {
    logError("DB error!!!");
}

function insertMatchAndPlayers(db, localName, visitorName) {
    innerInsertLocalPlayer(db, localName, visitorName);
}
    
function innerInsertLocalPlayer(db, localName, visitorName) {
    innerInsertPlayer(
        db, 
        localName, 
        function(idLocal) {
            logMessage("Insert player callback with ID " + idLocal);

            innerInsertVisitorPlayer(db, idLocal, visitorName);
        }
    );
}

function innerInsertVisitorPlayer(db, idLocal, visitorName) {
    innerInsertPlayer(
        db, 
        visitorName, 
        function(idVisitor) {
            innerInsertMatch(db, idLocal, idVisitor);
        }
    );    
}

function innerInsertPlayer(db, playerName, callback) {
    var ident = 0;

    db.transaction(
        function(e) {
            var now = getNow();
            e.executeSql(
                "INSERT INTO " + TABLE_NAMES[INDEX_TABLE_PLAYER] + "(name, timestamp) VALUES (?, ?)",
                [ playerName, now ], 
                function (tx, sql_res) {
                    ident = sql_res.insertId;

                    logMessage("New player with ID " + ident);

                    callback(ident);
                },
                function() {
                    logError("Error inserting player at " + now);
                }
            );
        }
    );
}

function innerInsertMatch(db, localPlayer, visitorPlayer) {
    db.transaction(
        function(e) {
            var now = getNow();
            e.executeSql(
                "INSERT INTO " + TABLE_NAMES[INDEX_TABLE_MATCH] + "(localPlayer, visitorPlayer, timeIni, timeEnd) VALUES (?, ?, ?, ?)",
                [ localPlayer, visitorPlayer, now, 0], 
                function(tx, sql_res){
                    var ident = sql_res.insertId;

                    logMessage("New match with ID " + ident);
                }, 
                function() {
                    logError("Error inserting match at " + now);
                }
            );
        }
    );
}

function insertEndMatch(db, matchId, summary) {
    db.transaction(
        function(e) {
            var now = getNow();
            e.executeSql(
                "UPDATE " + TABLE_NAMES[INDEX_TABLE_MATCH] + " SET timeEnd = ?, summary = ? WHERE id = ?",
                [ now, summary, matchId ], 
                function(tx, sql_res){
                    logMessage("Updated endTime in match " + matchId);
                }, 
                function() {
                    logError("Error updating match  " + matchId);
                }
            );
        }
    );    
}

function insertScore(db, points, set1, set2, set3, playerId, matchId) {
    db.transaction(

        function(e) {
            var now = getNow();
            e.executeSql(
                "INSERT INTO " + TABLE_NAMES[INDEX_TABLE_SCORE] + "(points, set1, set2, set3, playerId, matchId, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [ points, set1, set2, set3, playerId, matchId, now], 
                function(tx, sql_res){
                    var ident = sql_res.insertId;

                    logMessage("New score with id " + ident);
                }, 
                function() {
                    logError("Error inserting score at " + now);
                }
            );
        }
    );
}

function fetchMaxPlayerId(db, callback) {
    fetchMaxId(db, INDEX_TABLE_PLAYER, callback);
} 

function fetchMaxMatchId(db, callback) {
    fetchMaxId(db, INDEX_TABLE_MATCH, callback);
}

function fetchMaxId(db, index, callback) {
    db.transaction(
        function(t) {
            t.executeSql("SELECT MAX(id) AS mid FROM " + TABLE_NAMES[index], [], 
            function(tran, r) {
                var current = r.rows.item(0);
            
                var max = current["mid"];

                if (max == null) {
                    max = VALUE_NO_ID;
                }

                logMessage("Retrieved max(id) in " + TABLE_NAMES[index] + " : " + max);

                callback(max);
            }, 
            function(t, e) {
                logError("Error:" + e.message);

                callback(VALUE_NO_ID);
            }
        );
    });
}

function fetchAllMatches(db, callback) {
    fetchMatches(db, callback, ALL_MATCHES, true); //finished
}

function fetchFinishedMatches(db, startVal, endVal, callback, callbackError) {
    var matches = new Array();

    db.transaction(
        function(t) {
            t.executeSql(
                "SELECT DISTINCT id, timeIni, summary " + 
                "FROM " + TABLE_NAMES[INDEX_TABLE_MATCH] + " " + 
                "WHERE timeEnd IS NOT NULL AND summary IS NOT NULL " + 
                "AND id BETWEEN ? AND ?" + 
                "ORDER BY 1 DESC", 
                [(startVal - 1), endVal], 

            function(tran, r) {

                if (r.rows.length <= 0) {
                    callbackError();

                } else {
                    for (var i = 0; i < r.rows.length; i++) {
                        var current = r.rows.item(i);

                        var content = new PadelMatchSummary(current["id"], current["timeIni"], current["summary"]);

                        logMessage("Retrieved match " + content.toString());

                        matches.push(content);

                    }

                    callback(matches);
                }

            }, 
            function(t, e) {
                logError("Error:" + e.message);

                callbackError();
            }
        );
    });
}

function fetchCurrentMatch(db, callback, callbackError) {

    db.transaction(
        function(t) {
            t.executeSql(
                "SELECT id, timeIni " + 
                "FROM " + TABLE_NAMES[INDEX_TABLE_MATCH] + " " + 
                "WHERE timeEnd IS 0 " + 
                "ORDER BY 1 DESC", 
                [], 

            function(tran, r) {

                if (r.rows.length <= 0) {
                    callbackError();

                } else {
                    var current = r.rows.item(0);

                    var content = new PadelMatchHeader(current["id"], current["timeIni"], "");

                    logMessage("Retrieved current match " + content.toString());

                    callback(content);
                }
            }, 
            function(t, e) {
                logError("Error:" + e.message);

                callbackError();
            }
        );
    });
}