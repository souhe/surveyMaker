var Dispatcher = require('./dispatcher2.js');
var merge = require('react/lib/merge');

var EditorDispatcher = merge(Dispatcher.prototype, {
   handleViewAction: function(action){
       this.dispatch({
          source: "VIEW_ACTION",
           action: action
       });
   } 
});

module.exports = EditorDispatcher;