/** @jsx React.DOM */
var React = require('react');
var R = require('ramda');

var DynamicTextboxList = React.createClass({
    propTypes:{
        values: React.PropTypes.array,
        onSomethingChange: React.PropTypes.func,
        title: React.PropTypes.string,
        valueName: React.PropTypes.string
    },
    
    getInitialState: function(){
        return this.createStateFromProps(this.props);
    },
        
    render: function(){
        var curr = this;
        var values = this.state.values.map(function(value){
            return (
                <span className="answer">
                    <input type="radio" name="TODO!!!" />
                    <input type="text" key={value.id} onChange={curr.handleValueChange.bind(this, value)} onBlur={curr.handleSomethingChange} value={value.text} placeholder="Add answer here"/>
                    <div onClick={curr.handleDeletingAnswer.bind(this, value)} className="icon icon-cancel" title="Delete answer"></div>
                </span>
            );
        });
        var addButtonTitle = "Add " + this.props.valueName;
        return(
            <div>
                <label>{this.props.title}</label>
                {values}
                <span onClick={this.handleAddingAnswer} className="icon icon-plus" title={addButtonTitle}></span>
            </div>
        );
    },
    
    handleValueChange : function(value, event){
        var values = this.state.values;
        values[values.indexOf(value)].text = event.target.value; //TODO: change to Ramda
        this.setState({values: values});
    },
    
    handleSomethingChange : function(){
        var values = R.map(function (val){
            return val.text;
        }, this.state.values);
        this.props.onSomethingChange(values);
    },
    
    handleAddingAnswer: function(event){
        var values = this.state.values;
        values.push({text: "", id: values.length + 1});
        this.setState({answers: values});
    },
    
    handleDeletingAnswer: function(value, event){
        var values = this.state.values;
        values.splice(values.indexOf(anvalueswer), 1);
        this.onSomethingChange();
    },
    
    createStateFromProps: function(props){
        var i = 0;
        var values = props.values.map(function(values){
            i++;
            return {text: values, id: i}
        });
        
        return{
            values: values
        }
    }
});

module.exports = DynamicTextboxList;