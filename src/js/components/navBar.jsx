/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions/editorActions.js');

var TopBar = React.createClass({
    getInitialState: function(){
        return {

        };
    },

    render: function(){
        return(
            <header className="nav-bar">
                <ul>
                    <li onClick={this.handlePublishClick}>
                        <div className="button-body">Publish</div>
                        <span className="icon icon-floppy"></span>
                    </li>

                    <li onClick={this.handleUndoClick}>
                        <span className="button-body">Undo</span>
                        <span className="icon icon-reply"></span>
                    </li>
                </ul>
            </header>
        );
    },
    
    handlePublishClick: function(){
        Actions.publish();
    },
    
    handleUndoClick: function(){
        Actions.undo();
    }
});

module.exports = TopBar;
