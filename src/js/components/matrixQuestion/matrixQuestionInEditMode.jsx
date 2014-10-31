/** @jsx React.DOM */
var React = require('react');
var DynamicTextboxList = require('../dynamicTextboxList.jsx');

var matrixQuestionInEditMode = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func
    },
    
    getInitialState: function(){
        return this.createStateFromProps(this.props)
    },
    
    componentWillRecieveProps: function(nextProps){
        this.setState(this.createStateFromProps(nextProps));
    },
    
    render: function(){
        var curr = this;
        
        return (
            <div>
                <input type="text" className="header-input" onChange={this._onTitleChange} onBlur={curr.handleSomethingChnge} value={this.state.title} placeholder="Add question here"/>
                <input type="text" onChange={this._onDescriptionChange} onBlur={curr.handleSomethingChnge}  value={this.state.description} placeholder="Add description here"/>
                <DynamicTextboxList title="Values" onSomethingChange={this.handleValuesChange} values={this.state.values} valueName="Value"/>
                <DynamicTextboxList title="Keys" onSomethingChange={this.handleKeysChange} values={this.state.keys} valueName="Key"/>
            </div>
        );
    },

    handleValuesChange: function(values){
        this.setState({values: values}, this.handleSomethingChnge);
    },
    
    handleKeysChange: function(values){
        this.setState({keys: values}, this.handleSomethingChnge);
    },
    
    createStateFromProps: function(props){
        return{
            title: props.question.title,
            description: props.question.desription,
            values: props.question.questionData.values,
            keys: props.question.questionData.keys
        }
    },
    
    handleSomethingChnge: function(){	
        var question = this.props.question;	
        question.title = this.state.title;	
        question.description = this.state.description;
        question.questionData = {
            values : this.state.values,
            keys : this.state.keys
        };
        this.props.onChange(question);	
    }
});

module.exports = matrixQuestionInEditMode;