/** @jsx React.DOM */

var React = require('react');
var R = require('ramda');

var MatrixQuestionInViewMode = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired
    },
    
    render: function(){
        var values = this.props.question.questionData.values.map(function(value){
            return <td>{value}</td>
        });
        var generateEmptyRowsForValues = this.generateEmptyRows(this.props.question.questionData.values);
        var keys = this.props.question.questionData.keys.map(function(key){    
            var emptyRows =  generateEmptyRowsForValues(key);
            return (
                <tr>
                    <td>{key}</td>
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
                            <td></td>
                            {values}
                        </tr>
                    </thead>
                    <tbody>
                        {keys}
                    </tbody>
                </table>
            </div>
        );
    },
    
    generateEmptyRows: R.curry(function(values, name){
        var rows = values.map(function(){
            return <td><input type="radio" name={name}></input></td>
        });
        return rows;
    })
});

module.exports = MatrixQuestionInViewMode;