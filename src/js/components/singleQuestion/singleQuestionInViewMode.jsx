/** @jsx React.DOM*/
var React = require('react');

var SingleQuestionInViewMode = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired
    },
    
    render: function(){
    var curr = this;
        var answers = this.props.question.questionData.map(function(answer){
            return (
                <label><input type="radio" name={curr.props.question.id} />{answer}</label>
            );
        });
        return (
            <div>
                <h4>{this.props.question.title || 'Add question here'}</h4>
                <h5>{this.props.question.description || 'Add description here'}</h5>
                {answers}
            </div>
        );
    }
});

module.exports = SingleQuestionInViewMode;