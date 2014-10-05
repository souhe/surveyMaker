var EditorDispatcher = require('../dispatchers/editorDispatcher.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var ActionConstants = require('../constants/actionConstants');
var QuestionTypes = require('../constants/questionTypes');
var uuidGenerator = require('node-uuid');

var CHANGE_EVENT = 'change';

var _questionnaireInfo = {
    title: "Popularnoć arbuzow w Polsce",
    description: "i <3 arbuzy!"
};
var _questions = {};
_questions[1] = {
    id: 1,
    type: "single",
    title: "Czy lubisz arbuzy?",
    description: "",
    questionData: {

    }
    
};
_questions[2] = {
    id: 2,
    type: "single",
    title: "Jaki jest standardowy rozmiar arbuza?",
    description: "O co chodzi z tymi arbuzami...",
    questionData: {}
};

function _create(questionType){
    var uuid = uuidGenerator.v1();
    _questions[uuid] = {type: QuestionTypes.ESSAY, title: "", description: "", questionData: {}, id: uuid };
    console.log("questions:", _questions);
}

function _remove(id){

}

function _update(id, question){

}

function _updateInfo(info){
    _questionnaireInfo.title = info.title;
    _questionnaireInfo.description = info.description;
    localStorage.setItem('questionnaireInfo', JSON.stringify(_questionnaireInfo));
    console.log("updated info:", _questionnaireInfo);
}

//Store
var QuestionStore = merge(EventEmitter.prototype, {
    getAll: function(){
        return _questions;
    },

    getInfo: function(){
        return JSON.parse(localStorage.getItem('questionnaireInfo')) || _questionnaireInfo;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

//Registering actions
EditorDispatcher.register(function(payload){
    var action = payload.action;

    switch(action.actionType){
        case ActionConstants.ADD_QUESTION:
            _create(action.questionType);
            break;
        case ActionConstants.UPDATE_QUESTION:
            _update();
            break;
        case ActionConstants.UPDATE_INFO:
            _updateInfo({title: action.title, description: action.description});
            break;
    }
    QuestionStore.emitChange();

    return true;
});

module.exports = QuestionStore;
