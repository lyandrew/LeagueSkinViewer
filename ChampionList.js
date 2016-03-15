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
//const REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=882e5cb8-d65f-4cfa-afdf-456c352da004';
const REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=skins&api_key=882e5cb8-d65f-4cfa-afdf-456c352da004';
import ChampionDetail from './ChampionDetail'
class ChampionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.static_data = null;
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        var keys = Object.keys(responseData.data);
        //var values = keys.map(function(v) { return responseData.keys[v]; });
        let champion_list = []
        for (var key of keys) {
          champion_list.push(responseData.data[key])
        }
        // var keys = Object.keys(responseData.keys);
        // var values = keys.map(function(v) { return responseData.keys[v]; });
        // let champion_list = []
        // for (var key of keys) {
        //   champion_list.push(responseData.data[responseData.keys[key]])
        // }
        champion_list.sort(function(a, b) {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0
        });
      //  console.log(champion_list);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(champion_list),
          loaded: true,
        })
        this.static_data = responseData;

      })
      .done();
  }
  _handleResponse(champion) {
    //console.log('gg',champion)
    this.props.navigator.push({
        name: 'ChampionDetail',
        component: ChampionDetail,
        passProps: {champion: champion}
    });
  //   return (
  //   <Navigator
  //     initialRoute={{name: 'List Scene', index: 0}}
  //     renderScene={this._renderScene.bind(this)}
  //    />
  //  );
  }
  renderChampions(champion) {
    //console.log('champion', champion)
    return (
      <TouchableHighlight onPress={this._handleResponse.bind(this, champion)}
          underlayColor='#dddddd'>
        <View style={styles.container}>
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/'+champion.key+'.png'}}
            style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{champion.name}</Text>
            <Text style={styles.title}>{champion.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading data...
        </Text>
      </View>
    );
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderChampions.bind(this)}
        initialListSize={200}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
  thumbnail: {
    width: 120,
    height: 120,
  },
  name: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Verdana',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
  }
});
module.exports = ChampionList;
