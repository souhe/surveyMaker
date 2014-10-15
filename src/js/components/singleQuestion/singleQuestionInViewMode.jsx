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
                <div><label><input type="radio" name={curr.props.question.id} />{answer}</label></div>
            );
        });
        return (
            <div>
                <div  className="question-header">
                    <h2>{this.props.question.title || 'Add question here'}</h2>
                    <h4>{this.props.question.description || 'Add description here'}</h4>
                </div>
                {answers}
            </div>
        );
    }
});

module.exports = SingleQuestionInViewMode;