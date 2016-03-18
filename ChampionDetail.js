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

var Swiper = require('react-native-swiper')

class ChampionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skins: []
    };
    this.champion_key = ''
  }

  componentDidMount() {
     this.champion_key= this.props.champion.key;
     {this.props.champion.skins.map(function(item){
       console.log(item);
     })}
  }

  renderScene() {
    var champion_name = this.props.champion.name;

    // Used to remove the broken dot
    var renderPagination = function () {
      return (<View />
      )
    }
    return (
      <Swiper
        loop={false}
        renderPagination={renderPagination}>
        {this.props.champion.skins.map(function(skin){
          return (
              <View
                key={skin.id}
                style={styles.container}>
                <Image
                  source={{uri: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+champion_name+'_'+skin.num+'.jpg'}}
                  style={styles.loading}
                />
                <Text style={styles.text}>{skin.name}</Text>
              </View>
          );
        })}
      </Swiper>
    );
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: 'transparent', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    width: 308,
    height: 540,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  text: {
    color: '#F5FCFF',
    fontFamily: 'Verdana',
    fontWeight: 'bold',
  },
})

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
        onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return null;
  }
};

module.exports = ChampionDetail;
