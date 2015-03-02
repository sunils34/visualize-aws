
var React = require('react');
var EC2Mixin = require('../mixins/ec2.mixin');

var SidebarItem = React.createClass({
  mixins:[EC2Mixin],
  render: function() {
    return (
      <a href="{this.props.id}" className="sidebar-list-item"><li>{this.props.title}</li></a>
    );
  }
});

var SidebarSection = React.createClass({
  mixins:[EC2Mixin],
  render: function() {
    var title = this.props.title;
    var subtitles = [];
    console.log(this.props);
    this.props.subtitles.forEach(function(subtitle) {
      subtitles.push(<SidebarItem title={subtitle.title} id={subtitle.id} />);
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
  mixins:[EC2Mixin],
  render: function() {

    var sections = [];
    console.log(this.props.sections);
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
