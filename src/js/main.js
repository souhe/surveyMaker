window.React = require('react'); //TODO: Only for develping. Remove window.
var app = require('./components/app.jsx');
var d = require('es6!./dispatchers/dispatcher.js');

React.renderComponent(app(null), document.getElementById("main"));