var Dispatcher = require('../dispatchers/editorDispatcher.js');
var EditorConstants = require('../constants/actionConstants.js');

var Actions = {
    addQuestion: function(type){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.ADD_QUESTION,
            questionType: type
        });
    },
    updateQuestion: function(question){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.UPDATE_QUESTION,
            question: question  
        });  
    },
    updateInfo: function(info){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.UPDATE_INFO,
            title: info.title,
            description: info.description
        });
    },
    removeQuestion: function(id){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.REMOVE_QUESTION,
            id: id
        })
    },
    changeEditingQuestion: function(id){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.CHANGE_EDITING,
            id: id
        })
    },
    
    publish: function(){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.PUBLISH
        });
    },
    
    addRestorePoint: function(){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.ADD_RESTORE_POINT
        });
    },
    
    undo: function(){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.UNDO
        });
    },
    
    redo: function(){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.REDO
        });
    }
};

module.exports = Actions;
