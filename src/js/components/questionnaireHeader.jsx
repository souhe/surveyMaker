/** @jsx React.DOM */
var React = require('react');
var QuestionHeader = require('./questionHeader.jsx');

var QuestionnaireHeader = React.createClass({
    propTypes: {
        info: React.PropTypes.object.isRequired
    },
  
    render: function(){
        var title = this.props.info.title;
        var description = this.props.info.description;
        return (
            <header>
                <h1>{title}</h1>
                <h3>{description}</h3>
            </header>
        )
    }
});

module.exports = QuestionnaireHeader;