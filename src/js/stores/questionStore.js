var EditorDispatcher = require('../dispatchers/editorDispatcher.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var ActionConstants = require('../constants/actionConstants');
var QuestionTypes = require('../constants/questionTypes');
var uuidGenerator = require('node-uuid');

var CHANGE_EVENT = 'change';
var QUESTIONNAIRE_STORE = 'questionnaireStore3';

var _questionnaire = {
    info: {
        title: "Title",
        description: "Description"
    },
    questions: JSON.parse(localStorage.getItem(QUESTIONNAIRE_STORE)) || {},
    actuallyEditingQuestionId: null
}

function _saveQuestionsToStorage(){
    localStorage.setItem(QUESTIONNAIRE_STORE, JSON.stringify(_questionnaire.questions));
}

function _create(questionType){
    var uuid = uuidGenerator.v1();
    _questionnaire.questions[uuid] = {
        type: questionType,
        title: "",
        description: "",
        questionData: [""],
        id: uuid,
        isEditing: false
    }
    _changeEdtingQuestion(uuid);
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
    localStorage.setItem('questionnaireInfo', JSON.stringify(_questionnaire.info));
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

//Store
var QuestionStore = merge(EventEmitter.prototype, {
    getAll: function(){
        return _questionnaire.questions || {};
    },

    getInfo: function(){
        return JSON.parse(localStorage.getItem('questionnaireInfo'));
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
            break;
        case ActionConstants.UPDATE_QUESTION:
            _update(action.question);
            _saveQuestionsToStorage();
            break;
        case ActionConstants.REMOVE_QUESTION:
            _remove(action.id);
            _saveQuestionsToStorage();
            break;
        case ActionConstants.UPDATE_INFO:
            _updateInfo({title: action.title, description: action.description});
            break;
        case ActionConstants.CHANGE_EDITING:
            _changeEdtingQuestion(action.id);
            _saveQuestionsToStorage();
            break;
    }
    QuestionStore.emitChange();

    return true;
});

module.exports = QuestionStore;
