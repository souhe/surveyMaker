/** @jsx React.DOM */
var React = require('react');
var QuestionHeader = require('./questionHeader.jsx');
var ButtonBar = require('./buttonBar.jsx');

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

    render: function(){
        var content;
        if (this.state.isEditing) {
            content = (
                <span>
                    <input value={this.state.title} onChange={this._onTitleChange}/>
                    <input value={this.state.description} onChange={this._onDescriptionChange}/>

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
            <header>
                {content}
                <ButtonBar toggleEdit={this._toggleEdit}/>
            </header>
        );
    },

    _toggleEdit: function(){
        if(this.state.isEditing){
            this.setState({isEditing: false});
        }else{
            this.setState({isEditing: true});
        }
    },

    _onTitleChange: function(event){
        this.setState({title: event.target.value});
    },

    _onDescriptionChange: function(event){
        this.setState({description: event.target.value});
    }
});

module.exports = QuestionnaireHeader;
