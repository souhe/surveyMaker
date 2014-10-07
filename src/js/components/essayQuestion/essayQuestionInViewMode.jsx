/** @jsx React.DOM*/
var React = require('react');

var EssayQuestionInViewMode = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired
    },
    
    render: function(){
        return (
            <div>
                <h4>{this.props.question.title || 'Add question here'}</h4>
                <h5>{this.props.question.description || 'Add description here'}</h5>
                <input type="text" placeholder="answer"/>
            </div>
        );
    }
});

module.exports = EssayQuestionInViewMode;