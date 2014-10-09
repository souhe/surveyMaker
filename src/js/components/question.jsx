/** @jsx React.DOM*/
var React = require('react');
var Actions = require('../actions/editorActions.js');
var questionTypes = require('../constants/questionTypes.js')
var cx = require('react/lib/cx');

var EssayQuestionInEditMode = require('./essayQuestion/essayQuestionInEditMode.jsx');
var EssayQuestionInViewMode = require('./essayQuestion/essayQuestionInViewMode.jsx');
var ButtonBar = require('./buttonBar.jsx');

var Question = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired,
        onStartEditing: React.PropTypes.func,
        onStopEditing: React.PropTypes.func
    },
    
    getInitialState: function(){
        return {
            question: this.props.question
        };
    },
    
    render: function(){
        var content;
        var questionComponents = this.getQuestionComponents(this.state.question.type);
        var viewComponent = questionComponents.view;
        var editComponent = questionComponents.edit;
        if(this.state.question.isEditing){
            content = <viewComponent question={this.state.question} onChange={this._onQuestionChanged}/>;
        }else{
            content = <editComponent question={this.state.question}/>;
        }
        
        return (
            <div className={cx({
                    'question': true,
                    'isEditing': this.state.question.isEditing 
                })}>
                {content}
                <ButtonBar toggleEdit={this._toggleEdit} onRemoveClick={this._remove} isEditing={this.state.question.isEditing} />
            </div>
        );
    },

    _onQuestionChanged: function(question){
        this.setState({question: question});
    },
    
    _toggleEdit: function(){
        if(this.state.question.isEditing){
            Actions.updateQuestion(this.state.question);
            Actions.changeEditingQuestion(null);
        }else{
            Actions.changeEditingQuestion(this.state.question.id);
        }
    },
    
    _remove: function(){
        Actions.removeQuestion(this.state.question.id);
    },
    
    getQuestionComponents: function(type){
        switch (type){
            case questionTypes.ESSAY:
                return {view: EssayQuestionInEditMode, edit: EssayQuestionInViewMode}
                break;
        }
    }
});

module.exports = Question;