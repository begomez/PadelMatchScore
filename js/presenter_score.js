//////////////////////////////////////////////////////////////
// Logic for view "score.html"
//////////////////////////////////////////////////////////////

// Constants
var PLAYER_LOCAL_NAME = "Local";
var PLAYER_VISITOR_NAME = "Visitor";

var STR_CONTENT = "content";
var CONTENT_LOCAL_NAME = STR_CONTENT + PLAYER_LOCAL_NAME;
var CONTENT_VISITOR_NAME = STR_CONTENT + PLAYER_VISITOR_NAME;

var CURRENT_SET_1 = 1;
var CURRENT_SET_2 = 2;
var CURRENT_SET_3 = 3;

// Obj
var scoreCurrent;
var scoreLocal;
var scoreVisitor;
var match;

// HTML tags
var ID_TITLE = "mainTitle"; 
var ID_SUBTITLE = "secondaryTitle"; 
var ID_GAME = "itemGame";
var ID_SET_FIRST = "itemSetFirst";
var ID_SET_SECOND = "itemSetSecond";
var ID_SET_THIRD = "itemSetThird";


/////////////////////////////////////////////////////////////////////
// INIT
/////////////////////////////////////////////////////////////////////

function setTexts() {
    window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
    window.document.getElementById(ID_GAME).innerHTML = LANG_JSON_DATA["str_game"];
    window.document.getElementById(ID_SET_FIRST).innerHTML = LANG_JSON_DATA["str_set1"];
    window.document.getElementById(ID_SET_SECOND).innerHTML = LANG_JSON_DATA["str_set2"];
    window.document.getElementById(ID_SET_THIRD).innerHTML = LANG_JSON_DATA["str_set3"];

}

function dump() {
    logMessage(match.toString());
}

function initComponents() {
    initDataStruct();
    
    initListeners();
}

function initDataStruct() {
    scoreCurrent = 
        new PadelScore(0, "", 0, 0, 0 , 0);
    scoreLocal = 
        new PadelScore(0, PLAYER_LOCAL_NAME, 0, 0, 0, 0);     
    scoreVisitor = 
        new PadelScore(0, PLAYER_VISITOR_NAME, 0, 0, 0, 0);
    match = 
        new PadelMatch(scoreLocal, scoreVisitor);
}

function initListeners() {
    $("td.first").on("swipeleft", function(){
        decreasePoints(this);

        saveMatch();
    });

    $("td.first").on("swiperight", function(){
        increasePoints(this);

        saveMatch();
    });                       

    $("td.second, td.third, td.fourth").on("swipeup", function(){
        updateUI(this, true);

        saveMatch();
    });   

    $("td.second, td.third, td.fourth").on("swipedown", function(){
        updateUI(this, false);

        saveMatch();        
    });   
}

function updateUI(widget, increase) {
    var pos = match.getCurrentSet();
    var cell = getSiblingInPosition(widget, WIDGET_H1, pos);

    if (increase) {
        increaseGames(cell, pos);
        resetPoints();
    } else {
        decreaseGames(cell);
    }
}

function isContinueMatch() {
    var playing = readPlayingMatchFromStorage(); 

    return  (playing === VALUE_TRUE);
}

/////////////////////////////////////////////////////////////////////
// CREATE
/////////////////////////////////////////////////////////////////////

function createMatch() {
    logMessage("NEW GAME");

    var db = getRepository();

    var maxPlayer = 
        fetchMaxPlayerId(
            db, 
            function(maxPlayer) {
                createDataStruct(maxPlayer);

                insertMatchAndPlayers(db, PLAYER_LOCAL_NAME, PLAYER_VISITOR_NAME);

                writePlayingMatchInStorage();
            }
        );
}

function createDataStruct(maxPlayer) {
    scoreLocal = new PadelScore(maxPlayer + 1, PLAYER_LOCAL_NAME, 0, 0, 0, 0);    
    scoreVisitor = new PadelScore(maxPlayer + 2, PLAYER_VISITOR_NAME, 0, 0, 0, 0);
    match = new PadelMatch(scoreLocal, scoreVisitor);
}

/////////////////////////////////////////////////////////////////////
// RESTORE
/////////////////////////////////////////////////////////////////////

function restoreMatch() {
    logMessage("RESUME GAME");

    //id points set1 set2 set3
    var localStr = readLocalScoreFromStorage();
    var visitorStr = readVisitorScoreFromStorage();

    restoreDataStruct(localStr, visitorStr);

    writeLocalScoreInHTML(scoreLocal.toNumArr());
    writeVisitorScoreInHTML(scoreVisitor.toNumArr());
}

function restoreDataStruct(localData, visitorData) {
    scoreLocal.fromString(localData);
    scoreVisitor.fromString(visitorData);

    match = new PadelMatch(scoreLocal, scoreVisitor);
}

/////////////////////////////////////////////////////////////////////
// SAVE
/////////////////////////////////////////////////////////////////////

function saveMatch() {
    var localArr = readLocalScoreFromHTML();
    var visitorArr = readVisitorScoreFromHTML();

    if (scoreLocal.id != VALUE_NO_ID) {
        localArr[INDEX_ID] = scoreLocal.id;
    }

    if (scoreVisitor.id != VALUE_NO_ID) {
        visitorArr[INDEX_ID] = scoreVisitor.id;
    }
    
    saveMatchInStorage(localArr, visitorArr);
}

/////////////////////////////////////////////////////////////////////
// INTERACTIONS
/////////////////////////////////////////////////////////////////////

function increasePoints(widget) {
    var points = getCurrentPlayer().getNextPoint();

    getInnerChild(widget, WIDGET_H1).innerHTML = points;
}

function decreasePoints(widget) {
    var points = getCurrentPlayer().getPrevPoint();

    getInnerChild(widget, WIDGET_H1).innerHTML = points;
}

function increaseGames(widget, pos) {
    var current = getCurrentPlayer();

    var games = current.getNextGame(pos, widget.innerHTML);

    current.saveValueForSetNumber(pos, games);

    writeTextInHTML(widget.id, games);
}

function decreaseGames(widget, pos) {
    var current = getCurrentPlayer();

    var games = current.getPrevGame(pos, widget.innerHTML);

    current.saveValueForSetNumber(pos, games);

    writeTextInHTML(widget.id, games);
}

function resetPoints() {
    match.resetPoints();

    writeTextInHTML("localPoints", 0);
    writeTextInHTML("visitorPoints", 0);
}

function getCurrentPlayer() {
    return scoreCurrent;
}

function onLocalSelected(obj) {
    resizeElement(CONTENT_VISITOR_NAME, CONTENT_LOCAL_NAME, obj.id);

    scoreCurrent = scoreLocal;     
}

function onVisitorSelected(obj) {
    resizeElement(CONTENT_LOCAL_NAME, CONTENT_VISITOR_NAME, obj.id);        

    scoreCurrent = scoreVisitor;  
}