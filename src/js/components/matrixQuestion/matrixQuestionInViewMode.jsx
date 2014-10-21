/** @jsx React.DOM */

var React = require('react');

var MatrixQuestionInViewMode = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired
    },
    
    render: function(){
        var emptyRows = this.props.question.questionData.values.map(function(){
            return <td>o</td>
        });
        var keys = this.props.question.questionData.keys.map(function(key){       
            return (
                <tr>
                    <td>key</td>
                    {emptyRows}
                </tr>
            );
        });
        return (
            <div>
                <div  className="question-header">
                    <h4>{this.props.question.title || 'Add question here'}</h4>
                    <h5>{this.props.question.description || 'Add description here'}</h5>
                </div>
                <table>
                    <thead>
                        <tr>
                            {this.props.question.questionData.values}
                        </tr>
                    </thead>
                    <tbody>
                        {keys}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = MatrixQuestionInViewMode;