/** @jsx React.DOM */
var React = require('react');
var QuestionHeader = require('./questionHeader.jsx');

var QuestionnaireHeader = React.createClass({
    propTypes: {
        info: React.PropTypes.object.isRequired
    },
  
    render: function(){
        var info = this.props.info;
        return (
            <header>
                <QuestionHeader />
            </header>
        )
    }
});

module.exports = QuestionnaireHeader;