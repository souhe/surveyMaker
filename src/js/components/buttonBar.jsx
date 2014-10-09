/** @jsx React.DOM */
var React = require('react');

var ButtonBar = React.createClass({
    propsTypes: {
        isEditing: React.PropTypes.bool,
        toggleEdit: React.PropTypes.func.isRequired,
        onRemoveClick: React.PropTypes.func
    },
    
    getInitialState: function(){
        return {
            isEditing: this.props.isEditing
        };
    },
    
    render: function(){
        var buttonText = this.props.isEditing? "Save" : "Edit";
        return (
            <div class="button-bar">
                <button onClick={this._toggleEdit} >{buttonText}</button>
                <button onClick={this._remove} >Remove</button>
            </div>
        );
    },
    
    _toggleEdit: function(){
        this.props.toggleEdit();
/*
        this.setState({
            isEditing: !this.state.isEditing
        });
*/
    },
    
    _remove: function(){
        this.props.onRemoveClick();
    }
});

module.exports = ButtonBar;