/** @jsx React.DOM*/
var React = require('react');
var EssayQuestionInEditMode = require('./essayQuestionInEditMode.jsx');
var EssayQuestionInViewMode = require('./essayQuestionInViewMode.jsx');

var EssayQuestion = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired
        //saveQuestion: React.PropTypes.func
    },
    
    getInitialState: function(){
        return {
            isEditing: false,
            question: this.props.question
        };
    },
    
    render: function(){
        var content;
        if(this.state.isEditing){
            content = <EssayQuestionInEditMode question={this.state.question} onChange={this._onQuestionChanged}/>;
        }else{
            content = <EssayQuestionInViewMode question={this.state.question}/>;
        }
        
        return (
        <span>
            {content}
            <button onClick={this._toggleIsEditing}>/</button>
            </span>
        );
    },

    _onQuestionChanged: function(question){
        this.setState({question: question});
    },
    
    _toggleIsEditing: function(){
        this.setState({
            isEditing: !this.state.isEditing
        });
    }
});

module.exports = EssayQuestion;