/** @jsx React.DOM */
var React = require('react');
var QuestionTypes = require('../constants/questionTypes.js');
var EditorActions = require('../actions/editorActions.js');

var AddingQuestionBar = React.createClass({

    getInitialState: function(){
        return{
            selectedType: QuestionTypes.ESSAY
        };
    },
    render: function(){
        return(
            <div>
                <select onChange={this._onSelectChange} >
                    <option value={QuestionTypes.ESSAY}>Essay question</option>
                    <option value={QuestionTypes.SINGLE}>Single question</option>
                    <option value={QuestionTypes.MULTIPLE}>Multiple question</option>
                </select>
                <button onClick={this._handleAddClick}>Add question</button>
            </div>
        );
    },
    
    _handleAddClick: function(){
        EditorActions.addQuestion(this.state.selectedType);
    },
    
    _onSelectChange: function(event){
        this.setState({selectedType : event.target.value});
    }
});

module.exports = AddingQuestionBar;