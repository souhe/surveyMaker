/** @jsx React.DOM*/
var React = require('react');
var Actions = require('../../actions/editorActions.js');
var cx = require('react/lib/cx');

var EssayQuestionInEditMode = require('./essayQuestionInEditMode.jsx');
var EssayQuestionInViewMode = require('./essayQuestionInViewMode.jsx');
var ButtonBar = require('../buttonBar.jsx');

var EssayQuestion = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired,
        onStartEditing: React.PropTypes.func,
        onStopEditing: React.PropTypes.func
    },
    
    getInitialState: function(){
        return {
            isEditing: false,
            question: this.props.question
        };
    },
    
    render: function(){
        var content;
        if(this.state.question.isEditing){
            content = <EssayQuestionInEditMode question={this.state.question} onChange={this._onQuestionChanged}/>;
        }else{
            content = <EssayQuestionInViewMode question={this.state.question}/>;
        }
        
        return (
            <div className={cx({
                    'question': true,
                    'isEditing': this.state.question.isEditing 
                })}>
                {content}
                <ButtonBar toggleEdit={this._toggleEdit} onRemoveClick={this._remove} />
            </div>
        );
    },

    _onQuestionChanged: function(question){
        this.setState({question: question});
    },
    
    _toggleEdit: function(){
/*        this.setState({ isEditing: !this.state.isEditing });*/
        if(this.state.question.isEditing){
            Actions.updateQuestion(this.state.question);
            Actions.changeEditingQuestion(null);
/*            if(this.props.onStopEditing) this.props.onStopEditing();*/
        }else{
            Actions.changeEditingQuestion(this.state.question.id);
/*            if(this.props.onStartEditing) this.props.onStartEditing(this.state.question);*/
        }
    },
    
    _remove: function(){
        Actions.removeQuestion(this.state.question.id);
    }
});

module.exports = EssayQuestion;