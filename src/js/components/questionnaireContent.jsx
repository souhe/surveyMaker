/** @jsx React.DOM */
var React = require('react');
var AddingQuestionBar = require('./addingQuestionBar.jsx');
var Question = require('./question.jsx');
var QuestionTypes = require('../constants/questionTypes.js');
var EssayQuestion = require('./essayQuestion/essayQuestion.jsx');

var QuestionnaireContent = React.createClass({
    activeQuestionRef: null,
    
    propTypes: {
        questions: React.PropTypes.object.isRequired,
        //saveQuestion: React.PropTypes.func
    },

    render: function(){
        var questions = [];

        for (var key in this.props.questions) {
            var question = this.props.questions[key];
            var refName = "q-" + question.id;
            switch (question.type) {
                case QuestionTypes.ESSAY :
                    questions.push(<EssayQuestion ref={refName} question={question} key={question.id} 
                                            onStartEditing={this._startEditingHandler} onStopEditing={this._stopEditingHandler}/>);
                    break;
            }
        }
        
        return (
            <div>
                {questions}
                <AddingQuestionBar submitType={this._addQuestion} />
                <button onClick={this._refSth}>REF sth</button>
            </div>
        );
    } ,
    
    _startEditingHandler: function(question){
        if(this.activeQuestionRef){
            this.activeQuestionRef._toggleEdit();
        }
        this.activeQuestionRef = this.refs['q-'+question.id];
    },
    
    _stopEditingHandler: function(){
        this.activeQuestionRef = null
    }
});

module.exports = QuestionnaireContent;