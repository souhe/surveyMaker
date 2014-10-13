/** @jsx React.DOM */
var React = require('react');

var SingleQuestionInEditMode = React.createClass({
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
    
    render: function(){
        var curr = this;
        var answers = this.state.answers.map(function(answer){
            return (
                <span>
                    <input type="radio" name={curr.props.question.id} />
                    <input type="text" key={answer.id} onChange={curr._onAnswerChange.bind(this, answer)} onBlur={curr._onSomethingChange} value={answer.text} placeholder="Add answer here"/>
                    <span onClick={curr._handleDeletingAnswer.bind(this, answer)} className="icon icon-cancel" title="Delete answer"></span>
                </span>
            );
        });
        
        return (
            <div>
                <input type="text" onChange={this._onTitleChange} onBlur={curr._onSomethingChange} value={this.state.title} placeholder="Add question here"/>
                <input type="text" onChange={this._onDescriptionChange} onBlur={curr._onSomethingChange}  value={this.state.description} placeholder="Add description here"/>
                {answers} 
                <span onClick={this._handleAddingAnswer} className="icon icon-plus" title="Add answer"></span>
            </div>
        );
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
});

module.exports = SingleQuestionInEditMode;