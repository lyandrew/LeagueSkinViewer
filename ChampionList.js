'use strict';

import React, {
  Component,
  Image,
  ListView,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

const ApiKey = require('./.ApiKey.json')
const REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key='+ApiKey["riot"];
const VERSION_NUM_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions?api_key='+ApiKey["riot"]

export default class ChampionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      version_num: '6.5.1'
    };
    fetch(VERSION_NUM_URL).then((response) => response.json()).then((responseData) => { this.setState({version_num:responseData[0]}) }).done();
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

      })
      .done();
  }

  renderChampions(champion) {
    return (
      <TouchableHighlight onPress={() => this.props.onSelection(champion)}
          underlayColor='#dddddd'>
        <View style={styles.container}>
          <Image
            source={{uri: 'http://ddragon.leagueoflegends.com/cdn/'+this.state.version_num+'/img/champion/'+champion.key+'.png'}}
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
      <View style={styles.loading}>
        <ProgressBarAndroid styleAttr="Large" color="red" />
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
    return this.renderScene();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
    justifyContent: 'center',
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
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    color: 'gray'
  }
});
