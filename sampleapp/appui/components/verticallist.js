define(
  'sampleapp/appui/components/verticallist',
  [
    'lib/react',
    'antie/events/keyevent'
  ],
  function (React, KeyEvent) {
    var VerticalList = React.createClass({
      displayName: 'VerticalList',
      propTypes: {
        children: React.PropTypes.arrayOf(React.PropTypes.element),
        initialFocus: React.PropTypes.number,
        pubsub: React.PropTypes.object
      },
      componentWillMount: function () {
        this.keyeventToken = this.props.pubsub.subscribe('keyevent', this.handleKey)
      },
      componentWillUnmount: function () {
        this.props.pubsub.unsubscribe(this.keyeventToken)
      },
      getInitialState: function () {
        return {
          focus: this.props.initialFocus || 0
        }
      },
      handleKey: function (name, event) {
        var focus = this.state.focus
        switch (event.keyCode) {
          case KeyEvent.VK_DOWN:
            focus += 1
            break
          case KeyEvent.VK_UP:
            focus -= 1
            break
          case KeyEvent.VK_ENTER:
            this.props.pubsub.publish(this.props.children[this.state.focus].props.id + 'selected')
            break
          default:
            break
        }
        this.setState({
          focus: focus
        })
      },
      render: function () {
        var children = this.props.children.map(function (child, i) {
          var className = 'listitem'
          if (i === (this.state.focus + this.props.children.length) % this.props.children.length) {
            className += ' focus'
          }
          return React.cloneElement(child, {className: className, key: i})
        }.bind(this))
        return (
          <div className='verticallist'>
            {children}
          </div>
        )
      }
    })

    return VerticalList
  }
)
