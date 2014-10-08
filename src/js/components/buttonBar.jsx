/** @jsx React.DOM */
var React = require('react');

var ButtonBar = React.createClass({
    propsTypes: {
        toggleEdit: React.PropTypes.func.isRequired,
        onRemoveClick: React.PropTypes.func
    },
    
    getInitialState: function(){
        return {
            isEditing: false
        };
    },
    
    render: function(){
        var buttonText = this.state.isEditing? "Save" : "Edit";
        return (
            <div class="button-bar">
                <button onClick={this._toggleEdit} >{buttonText}</button>
                <button onClick={this._remove} >Remove</button>
            </div>
        );
    },
    
    _toggleEdit: function(){
        this.props.toggleEdit();
        this.setState({
            isEditing: !this.state.isEditing
        });
    },
    
    _remove: function(){
        this.props.onRemoveClick();
    }
});

module.exports = ButtonBar;