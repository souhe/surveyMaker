var EditorDispatcher = require('../dispatchers/editorDispatcher.js');
var ActionConstants = require('../constants/actionConstants');
var merge = require('merge');

var CHANGE_EVENT = 'historyChanged';

var historyArray = [];
var restorePointIdx = 0;
function _addRestorePoint(questionnaire){
    if(restorePointIdx < historyArray.length - 1){
        historyArray.splice(restorePointIdx + 1, historyArray.length - restorePointIdx -1);
    }
    historyArray.push({
        date: new Date(),
        questionnaire: merge(true, questionnaire)
    });
    if(historyArray.length > 30){
        historyArray.splice(0,1);
    }
    restorePointIdx = historyArray.length - 1;
}

//Store
var HistoryStore = {
    getPrevious: function(){
        if(restorePointIdx > 0){
            restorePointIdx--;
            var questionnaire = historyArray[restorePointIdx].questionnaire;
            return questionnaire; 

        }else{
            return null;
        }
    },
    
    getNext: function(){
        return  historyArray[historyArray.length-1].questionnaire; 
    },
    
    addRestorePoint: function(questionnaire){
        _addRestorePoint(questionnaire);
    }

};

module.exports = HistoryStore;