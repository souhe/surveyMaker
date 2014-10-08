/** @jsx React.DOM */
var React = require('react');
var QuestionStore = require('../stores/questionStore.js'); 
var QuestionnaireHeader = require('../components/questionnaireHeader.jsx');
var QuestionnaireContent = require('../components/questionnaireContent.jsx');

function getQuestionnaireState(){
    return {
        allQuestions: QuestionStore.getAll(),
        info: QuestionStore.getInfo()
    };
} 

var App = React.createClass({
    getInitialState: function(){
        return getQuestionnaireState();
    },
    
    componentDidMount: function(){
        QuestionStore.addChangeListener(this._onChange);
    },
    
    componendWillUnmount: function(){
        QuestionStore.removeChangeListener(this._onChange);
    },
    
    render: function(){
        return(
            <div>
                <QuestionnaireHeader info={this.state.info}/>
                <QuestionnaireContent questions={this.state.allQuestions} />
            </div>
        );
    },
    
    _onChange: function() {
        this.setState(getQuestionnaireState());
    }
});

module.exports = App;