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
  TouchableOpacity,
  View
} from 'react-native';
import ChampionDetail from './ChampionDetail'

const ApiKey = require('./.ApiKey.json')
const REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key='+ApiKey["riot"];

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
        let champion_list = []
        for (var key of keys) {
          champion_list.push(responseData.data[key])
        }
        champion_list.sort(function(a, b) {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(champion_list),
          loaded: true,
        })
        this.static_data = responseData;

      })
      .done();
  }

  _handleResponse(champion) {
    this.props.navigator.push({
        name: 'ChampionDetail',
        component: ChampionDetail,
        passProps: {champion: champion}
    });
  }

  renderChampions(champion) {
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

  renderScene() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderChampions.bind(this)}
        initialListSize={200}
      />
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <Navigator
        initialRoute={{name: 'Champion List', index: 0}}
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator} />
    )
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
