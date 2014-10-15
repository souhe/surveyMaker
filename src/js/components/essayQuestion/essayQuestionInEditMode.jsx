/** @jsx React.DOM */
var React = require('react');

var EssayQuestionInEditMode = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func
    },
    
    getInitialState: function(){
        return{
            title: this.props.question.title,
            description: this.props.question.description
        }
    },
    
    render: function(){
        return (
            <div>
                <input type="text" onChange={this._onTitleChange} value={this.state.title}  onBlur={this._onSomethingChange} placeholder="Add question here"/>
                <input type="text" onChange={this._onDescriptionChange}  value={this.state.description}  onBlur={this._onSomethingChange} placeholder="Add description here"/>
            </div>
        );
    },
    
    _onTitleChange : function(event){
        this.setState({title: event.target.value});
    },
    
    _onDescriptionChange: function(event){
        this.setState({description: event.target.value});
    },
    
    _onSomethingChange: function(){	
        var question = this.props.question;	
        question.title = this.state.title;	
        question.description = this.state.description;	
        this.props.onChange(question);	
    }
});

module.exports = EssayQuestionInEditMode;