var Dispatcher = require('../dispatchers/editorDispatcher.js');
var EditorConstants = require('../constants/actionConstants.js');

var Actions = {
    addQuestion: function(type){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.ADD_QUESTION,
            questionType: type
        });
    },
    updateInfo: function(info){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.UPDATE_INFO,
            title: info.title,
            description: info.description
        });
    }
};

module.exports = Actions;
