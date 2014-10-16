/** @jsx React.DOM */
var React = require('react');
var selectAnswerMixin = require('../mixins/selectAnswerQuestionMixin.jsx');

var SingleQuestionInEditMode = React.createClass({
    mixins: [selectAnswerMixin],

    render: function(){
        var curr = this;
        var answers = this.state.answers.map(function(answer){
            return (
                <span className="answer">
                    <input type="checkbox" name={curr.props.question.id} />
                    <input type="text" key={answer.id} onChange={curr._onAnswerChange.bind(this, answer)} onBlur={curr._onSomethingChange} value={answer.text} placeholder="Add answer here"/>
                    <div onClick={curr._handleDeletingAnswer.bind(this, answer)} className="icon icon-cancel" title="Delete answer"></div>
                </span>
            );
        });
        
        return (
            <div>
                <input type="text" className="header-input" onChange={this._onTitleChange} onBlur={curr._onSomethingChange} value={this.state.title} placeholder="Add question here"/>
                <input type="text" onChange={this._onDescriptionChange} onBlur={curr._onSomethingChange}  value={this.state.description} placeholder="Add description here"/>
                {answers} 
                <span onClick={this._handleAddingAnswer} className="icon icon-plus" title="Add answer"></span>
            </div>
        );
    }
});

module.exports = SingleQuestionInEditMode;