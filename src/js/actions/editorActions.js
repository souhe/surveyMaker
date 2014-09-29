var Dispatcher = require('../dispatchers/dispatcher');
var EditorConstants = require('../constants/actionConstants');

var Actions = {
    addQuestion: function(type){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.ADD_QUESTION,
            questionType: type
        })
    },
    updateInfo: function(info){
        Dispatcher.handleViewAction({
            actionType: EditorConstants.UPDATE_INFO,
            title: info.title,
            description: info.description
        })
    }
}