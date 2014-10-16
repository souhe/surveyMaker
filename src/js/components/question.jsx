/** @jsx React.DOM*/
var React = require('react');
var Actions = require('../actions/editorActions.js');
var questionTypes = require('../constants/questionTypes.js')
var cx = require('react/lib/cx');

var EssayQuestionInEditMode = require('./essayQuestion/essayQuestionInEditMode.jsx');
var EssayQuestionInViewMode = require('./essayQuestion/essayQuestionInViewMode.jsx');
var SingleQuestionInEditMode = require('./singleQuestion/singleQuestionInEditMode.jsx');
var SingleQuestionInViewMode = require('./singleQuestion/singleQuestionInViewMode.jsx');
var MultipleQuestionInEditMode = require('./multipleQuestion/multipleQuestionInEditMode.jsx');
var MultipleQuestionInViewMode = require('./multipleQuestion/multipleQuestionInViewMode.jsx');
var ButtonBar = require('./buttonBar.jsx');

var Question = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired,
        onStartEditing: React.PropTypes.func,
        onStopEditing: React.PropTypes.func
    },
    
    componentWillReceiveProps: function(){
        this.setState({
            question: this.props.question
        });
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
            content = <editComponent question={this.state.question} onChange={this._onQuestionChanged}/>;
        }else{
            content = <viewComponent question={this.state.question}/>;
        }
        
        return (
            <div className={cx({
                    'question': true,
                    'isEditing': this.state.question.isEditing 
                })}>
                <span className="question-content">
                {content}
                </span>
                <ButtonBar toggleEdit={this._toggleEdit} onRemoveClick={this._remove} isEditing={this.state.question.isEditing} />
            </div>
        );
    },
    
    _onQuestionChanged: function(question){	
        this.setState({question: question});
        Actions.addRestorePoint();
    },
    
    _toggleEdit: function(){
        if(this.state.question.isEditing){
            Actions.updateQuestion(this.state.question);
            Actions.changeEditingQuestion(null);
        }else{
            Actions.changeEditingQuestion(this.state.question.id);
        }
        Actions.addRestorePoint();
    },
    
    _remove: function(){
        Actions.removeQuestion(this.state.question.id);
        Actions.addRestorePoint();
    },
    
    getQuestionComponents: function(type){
        switch (type){
            case questionTypes.ESSAY:
                return {view: EssayQuestionInViewMode, edit: EssayQuestionInEditMode}
                break;
            case questionTypes.SINGLE:
                return {view: SingleQuestionInViewMode, edit: SingleQuestionInEditMode}
                break;
            case questionTypes.MULTIPLE:
                return {view: MultipleQuestionInViewMode, edit: MultipleQuestionInEditMode} 
        }
    }
});

module.exports = Question;