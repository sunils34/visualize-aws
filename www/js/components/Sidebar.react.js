
var React = require('react');
var AWSMixin = require('../mixins/aws.mixin');

var SidebarItem = React.createClass({

  mixins:[AWSMixin],
  render: function() {
    var num = "";
    if(this.props.id && this.state && this.state[this.props.id] != null) {
      num = " (" + this.state[this.props.id].length +")";
    }
    return (
      <a href="{this.props.id}" className="sidebar-list-item"><li>{this.props.title}{num}</li></a>
    );
  }
});

var SidebarSection = React.createClass({
  render: function() {
    var title = this.props.title;
    var subtitles = [];
    this.props.subtitles.forEach(function(subtitle) {
      subtitles.push(<SidebarItem title={subtitle.title} id={subtitle.id} mixin={subtitle.mixin}  />);
    });
    return (
      <ul className="sidebar-list">
        <span className="sidebar-list-title">{title}</span>
        {subtitles}
      </ul>
    );
  }
});

var Sidebar = React.createClass({
  render: function() {

    var sections = [];
    this.props.sections.forEach(function(section) {
      sections.push(<SidebarSection subtitles={section.subtitles} title={section.title}/>);
    });
    return (
      <section className="sidebar" id="js-sidebar">
        {sections}
      </section>
    );
  }
})

module.exports = Sidebar;
