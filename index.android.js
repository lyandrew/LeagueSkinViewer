'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
var ChampionList = require('./ChampionList');
var ApiKey = require('./.ApiKey.json')

const REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key='+ApiKey["riot"];

class League extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dataSource: new ListView.DataSource({
  //       rowHasChanged: (row1, row2) => row1 !== row2,
  //     }),
  //     loaded: false,
  //   };
  //   this.static_data = null;
  // }
  //
  //
  // _renderScene(route, navigator) {
  //   var Component = route.component;
  //   console.log('73', route)
  //   return (
  //     <Component navigator={navigator} route={route} state={route.state} />
  //   );
  // }
  render() {
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // }
    // return (
    //   <ListView
    //     dataSource={this.state.dataSource}
    //     renderRow={this.renderChampions.bind(this)}
    //     initialListSize={200}
    //   />
    // );
    // return (
    //   <Navigator
    //     initialRoute={{name: 'List Scene', index: 0}}
    //     renderScene={this._renderScene.bind(this)}
    //   />
    // );
    return (
        <Navigator
            initialRoute={{name: 'ChampionList', component: ChampionList}}
            configureScene={() => {
                return Navigator.SceneConfigs.FloatFromRight;
            }}
            renderScene={(route, navigator) => {
                // count the number of func calls
                //console.log(route, navigator);

                if (route.component) {
                    return React.createElement(route.component, { ...this.props, ...route.passProps, navigator, route } );
                }
            }}
         />
    );
  }
}

AppRegistry.registerComponent('League', () => League);
