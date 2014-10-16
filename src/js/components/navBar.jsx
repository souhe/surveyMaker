/** @jsx React.DOM */
var React = require('react');

var TopBar = React.createClass({
    getInitialState: function(){
        return {

        };
    },

    render: function(){
        return(
            <header className="nav-bar">
                <ul>
                    <li>
                        <div className="button-body">Save</div>
                        <span className="icon icon-floppy"></span>
                    </li>
                    <li>
                        <span className="button-body">Settings</span>
                        <span className="icon icon-cog"></span>
                    </li>
                    <li>
                        <span className="button-body">Undo</span>
                        <span className="icon icon-reply"></span>
                    </li>
                </ul>
            </header>
        );
    }
});

module.exports = TopBar;
