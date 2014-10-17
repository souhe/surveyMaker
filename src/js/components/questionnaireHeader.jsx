/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions/editorActions.js');
var QuestionHeader = require('./questionHeader.jsx');
var TitleButtonBar = require('./titleButtonBar.jsx');

var QuestionnaireHeader = React.createClass({
    propTypes: {
        info: React.PropTypes.object.isRequired
    },

    getInitialState: function(){
        return{
            isEditing : false,
            title: this.props.info.title || '',
            description: this.props.info.description || ''
        };
    },
    
    componentWillReceiveProps: function(newProps){
        this.setState({
            title: newProps.info.title || '',
            description: newProps.info.description || ''
        })
    },

    render: function(){
        var content;
        if (this.state.isEditing) {
            content = (
                <span>
                    <input value={this.state.title} onChange={this._onTitleChange} onBlur={this._onSomethingChange}/>
                    <input value={this.state.description} onChange={this._onDescriptionChange} onBlur={this._onSomethingChange}/>
                </span>
            );
        }else{
            content = (
                <span>
                    <h1>{this.state.title}</h1>
                    <h3>{this.state.description}</h3>
                </span>
            );
        }

        return (
            <div className="question-header">
                {content}
                <TitleButtonBar toggleEdit={this._toggleEdit}/>
            </div>
        );
    },

    _toggleEdit: function(){
        if(this.state.isEditing){
            this.setState({isEditing: false});
            Actions.updateInfo({title: this.state.title, description: this.state.description});
        }else{
            this.setState({isEditing: true});
            Actions.addRestorePoint();
        }
    },

    _onTitleChange: function(event){
        this.setState({title: event.target.value});
    },

    _onDescriptionChange: function(event){
        this.setState({description: event.target.value});
    },
    
    _onSomethingChange: function(){
        Actions.addRestorePoint(); //TODO: fix, zmienia niepotrzebnie state tego komponentu
    }
});

module.exports = QuestionnaireHeader;
