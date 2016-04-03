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
        console.log(this.props)
        return <div>{this.props.children}</div>
      }
    })

    var MainMenu = React.createClass({
      render: function () {
        return (
          <VerticalList focus={0} pubsub={PubSub}>
            <Div stuff='thing1'> thing! 1</Div>
            <div id='thing2'> thing! 2</div>
            <div id='thing3'> thing! 3</div>
            <div id='thing4'> thing! 4</div>
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
        // Called from run() as we need the framework to be ready beforehand.
        this.ready()
        this.render()
        // addEventThingsToPubsSub
        document.onkeydown = function (e) {
          PubSub.publish('keyevent', e)
        }
      }
    })
  }
)
