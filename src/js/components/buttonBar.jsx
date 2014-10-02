/** @jsx React.DOM */
var React = require('react');

var ButtonBar = React.createClass({
    propsTypes: {
        toggleEdit: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <div>
                <button onClick={this._toggleEdit} >Edit</button>
            </div>
        )
    },
    
    _toggleEdit: function(){
        this.props.toggleEdit();
    }
});

module.exports = ButtonBar;