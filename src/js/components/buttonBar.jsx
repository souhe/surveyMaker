/** @jsx React.DOM */
var React = require('react');

var ButtonBar = React.createClass({
    propsTypes: {
        toggleEdit: React.PropTypes.func.isRequired
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

module.exports = ButtonBar;