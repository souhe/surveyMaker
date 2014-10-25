var EditorDispatcher = require('../dispatchers/editorDispatcher.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var ActionConstants = require('../constants/actionConstants');
var QuestionTypes = require('../constants/questionTypes');
var uuidGenerator = require('node-uuid');
var $ = require('jquery');
var HistoryStore = require('./historyStore.js');

var CHANGE_EVENT = 'change';
var QUESTIONNAIRE_DATA = 'questionnaireData3';
var QUESTIONNAIRE_INFO = 'questionnaireInfo';

var _questionnaire = _getQuestionnaireFromLS();
HistoryStore.addRestorePoint(_questionnaire);

function _getQuestionnaireFromLS(){
    var questions = JSON.parse(localStorage.getItem(QUESTIONNAIRE_DATA)) || {};
    var info = JSON.parse(localStorage.getItem(QUESTIONNAIRE_INFO)) || {};
    var actuallyEditingQuestionId;
    for(var key in questions){
        if(questions[key].isEditing){
            actuallyEditingQuestionId = questions[key].id;
        }
    }
    
    return {
        info: {
            title: info.title || "",
            description: info.description || ""
        },
        questions: questions,
        actuallyEditingQuestionId: actuallyEditingQuestionId
    };
}

//Action helpers
function _saveQuestionsToStorage(){
    localStorage.setItem(QUESTIONNAIRE_DATA, JSON.stringify(_questionnaire.questions));
}

function _create(questionType){
    var uuid = uuidGenerator.v1();
    _questionnaire.questions[uuid] = {
        type: questionType,
        title: "",
        description: "",
        questionData: _generateQuestionDatabyType(questionType), 
        id: uuid,
        isEditing: false
    }
    _changeEdtingQuestion(uuid);
}

function _generateQuestionDatabyType(type){
    switch (type){
        case QuestionTypes.ESSAY:
            return null;
        case QuestionTypes.MULTIPLE:
        case QuestionTypes.SINGLE:
            return [""];
        case QuestionTypes.MATRIX:
            return {
                values: ["1", "2", "3", "4"],
                keys: ["test", "test 2"]
            };       
    }
    return [];
}

function _remove(id){
    delete _questionnaire.questions[id];
    if(_questionnaire.actuallyEditingQuestionId == id){
        _questionnaire.actuallyEditingQuestionId = null;
    }
}

function _update(question){
    _questionnaire.questions[question.id] = question;
}

function _updateInfo(info){
    _questionnaire.info.title = info.title;
    _questionnaire.info.description = info.description;
    localStorage.setItem(QUESTIONNAIRE_INFO, JSON.stringify(_questionnaire.info));
}

function _changeEdtingQuestion(id){
    if(_questionnaire.actuallyEditingQuestionId){
        _questionnaire.questions[_questionnaire.actuallyEditingQuestionId].isEditing = false;
    }
    
    if(id){
        _questionnaire.questions[id].isEditing = true;
    }
    _questionnaire.actuallyEditingQuestionId = id;
}

function _publish(){
    $.ajax({
        //TODO
    });
}

function _undo(){
    _questionnaire = HistoryStore.getPrevious() || _questionnaire;
}

function _redo(){
    _questionnaire = HistoryStore.getNext() || _questionnaire;
}

//Store
var QuestionStore = merge(EventEmitter.prototype, {
    getAll: function(){
        return _questionnaire.questions || {};
    },

    getInfo: function(){
        return _questionnaire.info;
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
            _saveQuestionsToStorage();
            QuestionStore.emitChange();
            break;
        case ActionConstants.UPDATE_QUESTION:
            _update(action.question);
            _saveQuestionsToStorage();
            QuestionStore.emitChange();
            break;
        case ActionConstants.REMOVE_QUESTION:
            _remove(action.id);
            _saveQuestionsToStorage();
            QuestionStore.emitChange();
            break;
        case ActionConstants.UPDATE_INFO:
            _updateInfo({title: action.title, description: action.description});
            QuestionStore.emitChange();
            break;
        case ActionConstants.CHANGE_EDITING:
            _changeEdtingQuestion(action.id);
            _saveQuestionsToStorage();
            QuestionStore.emitChange();
            break;
        case ActionConstants.PUBLISH:
            _publish();
            QuestionStore.emitChange();
            break;
        case ActionConstants.ADD_RESTORE_POINT:
            HistoryStore.addRestorePoint(_questionnaire);
            break;
        case ActionConstants.UNDO:
            _undo();
            QuestionStore.emitChange();
            break;
        case ActionConstants.REDO:
            _redo();
            QuestionStore.emitChange();
            break;
    }

    return true;
});

module.exports = QuestionStore;
