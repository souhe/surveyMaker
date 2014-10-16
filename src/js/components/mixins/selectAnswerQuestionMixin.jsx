/** @jsx React.DOM */
var React = require('react');

var selectAnswerQuestionMixin = {
    propTypes: {
        question: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func
    },
    
    getInitialState: function(){
        var i = 0;
        var answers = this.props.question.questionData.map(function(answer){
            i++;
            return {text: answer, id: i}
        });
        return{
            title: this.props.question.title,
            description: this.props.question.description,
            answers: answers
        }
    },
    
    _onTitleChange : function(event){
        this.setState({title: event.target.value});
    },
    
    _onDescriptionChange: function(event){
        this.setState({description: event.target.value});
    },
    
    _onAnswerChange : function(answer, event){
        var answers = this.state.answers;
        answers[answers.indexOf(answer)].text = event.target.value;
        this.setState({aswers: event.target.answers});
    },
    
    _handleAddingAnswer: function(event){
        var answers = this.state.answers;
        answers.push({text: "", id: answers.length + 1});
        this.setState({answers: answers});
    },
    
    _handleDeletingAnswer: function(answer, event){
        var answers = this.state.answers;
        answers.splice(answers.indexOf(answer), 1);
        this._onSomethingChange();
    },
    
    _onSomethingChange: function(){	
        var question = this.props.question;	
        question.title = this.state.title;	
        question.description = this.state.description;
        question.questionData = this.state.answers.map(function(answer){return answer.text});
        this.props.onChange(question);	
    }
};

module.exports = selectAnswerQuestionMixin;