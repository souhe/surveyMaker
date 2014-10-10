/** @jsx React.DOM */
var React = require('react');
var AddingQuestionBar = require('./addingQuestionBar.jsx');
var QuestionTypes = require('../constants/questionTypes.js');
var Question = require('./question.jsx');

var QuestionnaireContent = React.createClass({
    
    propTypes: {
        questions: React.PropTypes.object.isRequired,
    },

    render: function(){
        var questions = [];

        for (var key in this.props.questions) {
            var question = this.props.questions[key];
            questions.push(<Question question={question} key={question.id} />);
            
        }
        
        return (
            <div>
                {questions}
                <AddingQuestionBar />
            </div>
        );
    } 
});

module.exports = QuestionnaireContent;