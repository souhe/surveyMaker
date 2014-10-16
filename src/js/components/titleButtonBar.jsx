/** @jsx React.DOM */
var React = require('react');

var TitleButtonBar = React.createClass({
    propsTypes: {
        isEditing: React.PropTypes.bool,
        toggleEdit: React.PropTypes.func.isRequired
    },
    
    getInitialState: function(){
        return {
            isEditing: this.props.isEditing
        };
    },
    
    render: function(){
        var buttonText = this.props.isEditing? "Save" : "Edit";
        return (
            <div className="button-bar">
                <button onClick={this._toggleEdit} >{buttonText}</button>
            </div>
        );
    },
    
    _toggleEdit: function(){
        this.props.toggleEdit();
        this.setState({
            isEditing: !this.state.isEditing
        });
    }
});

module.exports = TitleButtonBar;