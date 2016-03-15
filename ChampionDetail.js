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
  //   console.log('aaaaaa', this.props)
   }

  render () {
    console.log('aaaa', this);
    var champion_name = this.props.champion.name;

    // Used to remove the broken dot
    var renderPagination = function () {
      return (<View />
      )
    }
    return (
      // <Swiper
      //   showsButtons={false}
      //   loop={false}>
      //   <View >
      //     <Image
      //       source={{uri: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg'}}
      //       style={styles.thumbnail}
      //     />
      //   </View>
      //   <View >
      //     <Image
      //       source={{uri: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_1.jpg'}}
      //       style={styles.thumbnail}
      //     />
      //   </View>
      //   <View >
      //     <Image
      //       source={{uri: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_2.jpg'}}
      //       style={styles.thumbnail}
      //     />
      //   </View>
      // </Swiper>
      <Swiper
        loop={false}
        renderPagination={renderPagination}
        >
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
            // <View style={item.css}>
            //   <Text style={styles.text}>{item.title}</Text>
            // </View>
          );
        })}
      </Swiper>
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
module.exports = ChampionDetail;
