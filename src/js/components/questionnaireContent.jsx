/** @jsx React.DOM */
var React = require('react');
var AddingQuestionBar = require('./addingQuestionBar.jsx');

var QuestionnaireContent = React.createClass({
    propTypes: {
        questions: React.PropTypes.object.isRequired
    },
    render: function(){
        return (
            <div>
                <AddingQuestionBar submitType={this._addQuestion} />
            </div>
        )
    } ,
    
    _addQuestion: function(){
        
    }
});

module.exports = QuestionnaireContent;