define(
  'sampleapp/appui/sampleapp',
  [
    'lib/react',
    'lib/reactdom',
    'lib/reactrouter',
    'antie/application',
    'antie/events/keyevent',
    'sampleapp/appui/components/verticallist',
    'sampleapp/event/pubsub'
  ],
  function (React, ReactDOM, ReactRouter, Application, KeyEvent, VerticalList, PubSub) {
    window.pubsub = PubSub
    var appDiv = document.getElementById('app')
    var Router = ReactRouter.Router
    var Route = ReactRouter.Router
    var IndexRoute = ReactRouter.IndexRoute
    var hashHistory = ReactRouter.hashHistory

    var Stuff = React.createClass({
      render: function () {
        return (
            <div>stuff</div>
        )
      }
    })

    var Div = React.createClass({
      render: function () {
        return <div className={this.props.className}>{this.props.children}</div>
      }
    })

    var MainMenu = React.createClass({
      componentWillMount: function () {
        PubSub.subscribe('thing1selected', function () {
            hashHistory.push('/stuff')
        })
      },
      render: function () {
        return (
          <VerticalList focus={0} pubsub={PubSub}>
            <Div id='thing1'> Go to stuff</Div>
            <Div id='thing2'> thing! 2</Div>
            <Div id='thing3'> thing! 3</Div>
            <Div id='thing4'> thing! 4</Div>
          </VerticalList>
        )
      }

    })

    return Application.extend({
      init: function (styleDir, imgDir, callback) {
        this._super(appDiv, styleDir, imgDir, callback)
      },

      render: function (keyEvent) {
        ReactDOM.render(
          <Router history={hashHistory}>
            <Route path='/'>
            <IndexRoute component={MainMenu} />
            <Route path='stuff' component={Stuff} />
            </Route>
          </Router>,
          appDiv
        )
      },

      run: function () {
        this.ready()
        this.render()

        // steal TAL events
        this._focussedWidget = { // "widget" ...
          bubbleEvent: function (evt) {
            if (evt.type === 'keydown') {
              PubSub.publish('keyevent', evt)
            }
          }
        }

        PubSub.subscribe('keyevent', function (evt, args) {
          if(args.keyCode === KeyEvent.VK_BACK) {
            hashHistory.goBack()
          }
        })
      }
    })
  }
)
