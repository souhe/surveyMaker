/** @jsx React.DOM*/
var React = require('react');

var EssayQuestion = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired,
        //saveQuestion: React.PropTypes.func
    },
    
    getInitialState: function(){
        return {
            isEditing: false
        };
    },
    
    render: function(){
        return (
            <div onBlur={this._cos}>EssayQuestion content - {this.props.question.title}</div>
        );
    },
    
    _cos: function(){
        alert('no');
    }
});

module.exports = EssayQuestion;