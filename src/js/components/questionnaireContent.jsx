/** @jsx React.DOM */
var React = require('react');
var AddingQuestionBar = require('./addingQuestionBar.jsx');
var QuestionTypes = require('../constants/questionTypes.js');
var EssayQuestion = require('./essayQuestion/essayQuestion.jsx');

var QuestionnaireContent = React.createClass({
    
    propTypes: {
        questions: React.PropTypes.object.isRequired,
    },

    render: function(){
        var questions = [];

        for (var key in this.props.questions) {
            var question = this.props.questions[key];
            switch (question.type) {
                case QuestionTypes.ESSAY :
                    questions.push(<EssayQuestion question={question} key={question.id} 
                                            onStartEditing={this._startEditingHandler} onStopEditing={this._stopEditingHandler}/>);
                    break;
            }
        }
        
        return (
            <div>
                {questions}
                <AddingQuestionBar submitType={this._addQuestion} />
            </div>
        );
    } ,
    
    _startEditingHandler: function(question){

    },
    
    _stopEditingHandler: function(){

    }
});

module.exports = QuestionnaireContent;