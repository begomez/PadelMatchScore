//////////////////////////////////////////////////////////////
// File containing class declarations
//////////////////////////////////////////////////////////////

var SPORT_NAME = "Padel";
var MAX_POINTS = 40;
var MAX_GAMES = 6;
var MAX_SETS = 3;

var INDEX_ID = 0;
var INDEX_POINTS = 1;
var INDEX_SET1 = 2;
var INDEX_SET2 = 3;
var INDEX_SET3 = 4;

var VALUE_0 = 0;
var VALUE_15 = 15;
var VALUE_30 = 30;
var VALUE_40 = 40;

var POSITION_SET_1 = 1;
var POSITION_SET_2 = 2;
var POSITION_SET_3 = 3;

var NEW_LINE = "\n";


/**
 *
 */
function Config(pname, pnumGames, pnumSets) {
    this.name = pname;
    this.numGames = pnumGames;
    this.numSets = pnumSets;
}

/**
 *
 */
function PadelScore(pid, pname, ppoints, pset1, pset2, pset3) {
	this.id = pid,
    this.name = pname,
    this.points = ppoints,
    this.set1  = pset1,
    this.set2   = pset2,
    this.set3   = pset3,
    this.config = new Config(SPORT_NAME, MAX_GAMES, MAX_SETS),
    this.getId = function() {
        return this.id;    
    }, 
    this.setId = function(pid) {
        this.id = pid;
    },
    this.getName = function() {
    	return this.name;
    },
    this.setName = function(pname) {
		this.name = pname;
    },
    this.getPrevPoint = function() {
    		var ret = Number(this.points);
    	
    		switch (this.points) {
    			case VALUE_0:
    				ret = VALUE_0;
    				break;
    			case VALUE_15:
    				ret = VALUE_0;
    				break;
    			case VALUE_30:
    				ret = VALUE_15;
    				break;
    			case VALUE_40:
    				ret = VALUE_30;
    				break;
				default:
					break;
    		}
    		
    		this.points = ret;
    		
    		return ret;
    },
    this.getNextPoint = function() {
    		var ret = Number(this.points);
    		
    		switch (this.points) {
    			case VALUE_0:
    				ret = VALUE_15;
    				break;
    			case VALUE_15:
    				ret = VALUE_30;
    				break;
    			case VALUE_30:
    				ret = VALUE_40;
    				break;
				case VALUE_40:
					ret = VALUE_0;
				default:
					break;
    		}
    		
    		this.points = ret;
    		
    		return ret;
    },
    this.getPrevGame = function(pos, currentVal) {
		var newVal = VALUE_0;

		switch (Number(currentVal)) {
			case VALUE_0:
				newVal = VALUE_0;
				break;
			default:
				newVal = Number(currentVal) - 1;
				break;
		} 

        this.saveValueForSetNumber(pos, newVal);

		return newVal;
    },	    
    this.getNextGame = function(pos, currentVal) {
		var newVal = VALUE_0;

		switch (Number(currentVal)) {
			case MAX_GAMES:
				newVal = MAX_GAMES;
				break;
			default:
				newVal = Number(currentVal) + 1;
				break;
		} 

        this.saveValueForSetNumber(pos, newVal);

		return newVal;
    },
    this.resetPoints = function() {
        this.points = 0;
    },
    this.saveValueForSetNumber = function(setNumber, value) {
        switch (setNumber) {
            case POSITION_SET_1:
                this.set1 = value;
                break;
            case POSITION_SET_2:
                this.set2 = value;
                break;
            case POSITION_SET_3:
                this.set3 = value;
                break;
        }
    },
    this.isSetFinished = function(numGames) {
        return numGames == MAX_GAMES;
    },
    this.toString = function() {
		var ret = "";
		
		ret += "Player " + this.name + NEW_LINE;
		ret += "Points " + this.points + NEW_LINE;
		ret += "Set 1. " + this.set1 + NEW_LINE;
		ret += "Set 2  " + this.set2 + NEW_LINE;
		ret += "Set 3. " + this.set3 + NEW_LINE;
		
		return ret;
    },
    this.fromString = function(str) {
        var SEPARATOR = ",";

        if (!str.includes(SEPARATOR)) {
            SEPARATOR = "|";
        }

        var splitted = stringToArray(str, SEPARATOR);
        //id points set1 set2 set3

        this.id = Number(splitted[INDEX_ID]); 
        this.points = Number(splitted[INDEX_POINTS]); 
        this.set1 = Number(splitted[INDEX_SET1]);
        this.set2 = Number(splitted[INDEX_SET2]);
        this.set3 = Number(splitted[INDEX_SET3]);
    },
    this.toNumArr = function() {
        var numbers = 
            new Array(this.id, this.points, this.set1, this.set2, this.set3);

        return numbers;
    },
    this.fromNumArr = function(numArr) {
        this.id = (numArr[INDEX_ID]); 
        this.points = (numArr[INDEX_POINTS]); 
        this.set1 = (numArr[INDEX_SET1]);
        this.set2 = (numArr[INDEX_SET2]);
        this.set3 = (numArr[INDEX_SET3]);
    };
}

/**
 *
 */
function PadelMatch(plocal, pvisitor) {
    this.local = plocal,
    this.visitor = pvisitor,
    this.setInPlay = function(setLocal, setVisitor) {
        return setLocal < MAX_GAMES && setVisitor < MAX_GAMES;
    },
    this.getCurrentSet = function() {

        // 1
        if (this.setInPlay(this.local.set1, this.visitor.set1)) {
            return POSITION_SET_1;

        // 2
        } else if (this.setInPlay(this.local.set2, this.visitor.set2)) {
            return POSITION_SET_2;

        // 3
        } else {
            return POSITION_SET_3;
        }

    },
    this.resetPoints = function() {
        this.local.resetPoints();
        this.visitor.resetPoints();
    },
    this.toString = function() {
        var ret = "";

        ret += this.getCurrentSet();
        ret += NEW_LINE;
        ret += this.local.toString();
        ret += NEW_LINE;
        ret += this.visitor.toString();

        return ret;
    };
}

/**
 *
 */
function PadelMatchSummary(pid, ptime, psummary) {
	this.id = pid,
	this.time = ptime,
    this.summary = psummary,
    this.getId = function() {
        return this.id;
    },
    this.setId = function(pid) {
        this.id = pid;
    },
    this.getTime = function () {
        return this.time;
    },
    this.setTime = function(ptime) {
        this.time = ptime;
    },
    this.getSummary = function() {
        return this.summary;
    },
    this.setSummary = function(psummary) {
        this.summary = psummary;
    },
    this.toString = function() {
        return this.id + " " + this.time + " " + this.summary;
    },
    this.getGamesPerSet = function(setNumber) {
		 var splitted = stringToArray(this.summary, " ");
         //set1 set2 set3

         return Number(splitted[setNumber - 1].substring(0, 1)); 
    },
    this.getGamesPerMatch = function() {    		
    		 return this.getGamesPerSet(1) + this.getGamesPerSet(2) + this.getGamesPerSet(3);
    };
}


