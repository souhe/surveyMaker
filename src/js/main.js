var React = require('react');
var app = require('./components/app.jsx');
var d = require('es6!./dispatchers/dispatcher.js');

React.renderComponent(app(null), document.getElementById("main"));