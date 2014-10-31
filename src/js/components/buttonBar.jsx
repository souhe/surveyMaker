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
        var buttonClass="icon ";
        buttonClass += this.props.isEditing? "icon-ok" : "icon-pencil";
        return (
            <div className="button-bar">
                <span className={buttonClass} onClick={this._toggleEdit} title={buttonText} ></span>
                <span className="icon icon-trash-1" onClick={this._remove} title="Remove" ></span>
            </div>
        );
    },

    _toggleEdit: function(){
        this.props.toggleEdit();
    },

    _remove: function(){
        this.props.onRemoveClick();
    }
});

module.exports = ButtonBar;
