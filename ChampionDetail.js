'use strict';
import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Swiper = require('react-native-swiper')

export default class ChampionDetail extends React.Component {
  render () {
    var champion_key = this.props.champion.key;

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
                  source={{uri: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+champion_key+'_'+skin.num+'.jpg'}}
                  style={styles.vertical}
                />
                <Text style={styles.text}>{skin.name}</Text>
              </View>
          );
        })}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
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


module.exports = ChampionDetail;
