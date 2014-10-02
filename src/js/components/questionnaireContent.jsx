/** @jsx React.DOM */
var React = require('react');

var QuestionnaireContent = React.createClass({
    propTypes: {
        questions: React.PropTypes.object.isRequired
    },
    render: function(){
        return (
            <div>content</div>
        )
    } 
});

module.exports = QuestionnaireContent;