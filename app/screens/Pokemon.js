import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Badge, ThemeProvider, Button } from 'react-native-elements';
import TYPES_COLORS from '../constants/types_color';
import { url, urlImage } from '../constants/url';
import Icon from 'react-native-vector-icons/FontAwesome';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      number: this.props.navigation.getParam('number')
    };
  }

  getData = async () => {
    const urlList = `${url}${this.state.number}/`;

    await fetch(urlList)
      .then(res => res.json())
      .then(res => this.setState({ data: res }));
  };

  nextPage = () => {
    this.setState(
      {
        number: this.state.number == 807 ? 1 : parseInt(this.state.number) + 1,
        data: null
      },
      this.getData
    );
  };

  previousPage = async () => {
    this.setState(
      {
        number: this.state.number == 1 ? 807 : parseInt(this.state.number) - 1,
        data: null
      },
      this.getData
    );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { number, data } = this.state;

    return data ? (
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.buttons}>
            <Button
              title={
                this.state.number == 1
                  ? '807'
                  : (parseInt(this.state.number) - 1).toString()
              }
              onPress={this.previousPage}
              icon={<Icon name='arrow-left' size={15} color='white' />}
              buttonStyle={{ height: 40, width: 50 }}
              titleStyle={{ color: 'white' }}
            />
            <Text style={styles.itemTextL}>N° {number}</Text>
            <Button
              style={{ height: 20, width: 150 }}
              title={
                this.state.number == '807'
                  ? '1'
                  : (parseInt(this.state.number) + 1).toString()
              }
              onPress={this.nextPage}
              icon={<Icon name='arrow-right' size={15} color='white' />}
              iconRight
              buttonStyle={{ height: 40, width: 50 }}
              titleStyle={{ color: 'white' }}
            />
          </View>
          <View style={styles.itemDescription}>
            <ImageBackground
              source={require(`../assets/background.jpg`)}
              style={{
                width: 300,
                height: 300,
                borderRadius: 150,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              imageStyle={{ borderRadius: 150 }}
              resizeMode='cover'
            >
              <Image
                source={{
                  uri: `${urlImage}${number}.png`
                }}
                style={styles.itemImage}
              />
            </ImageBackground>
            <Text style={styles.itemTextL}>{data.name}</Text>
          </View>
          <View style={styles.itemStats}>
            <Text style={styles.itemText}>{`Height: ${data.height}`}</Text>
            <Text style={styles.itemText}>{`Weight: ${data.weight}`}</Text>
          </View>
          <Text style={styles.itemText}>Type</Text>
          <View style={styles.badges}>
            {data.types.map((elem, index) => (
              <ThemeProvider
                key={index}
                theme={{
                  Badge: {
                    badgeStyle: {
                      backgroundColor: `#${TYPES_COLORS[elem.type.name]}`,
                      width: 60,
                      height: 25
                    }
                  }
                }}
              >
                <Badge value={elem.type.name} />
              </ThemeProvider>
            ))}
          </View>
          <Text style={styles.itemText}>Abilities</Text>
          <View style={styles.abilities}>
            {data.abilities.map((elem, index) => (
              <ThemeProvider
                key={index}
                theme={{
                  Badge: {
                    badgeStyle: {
                      height: 25
                    }
                  }
                }}
              >
                <Badge key={index} value={elem.ability.name} />
              </ThemeProvider>
            ))}
          </View>
        </View>
      </ScrollView>
    ) : (
      <ActivityIndicator size='large' />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ef5350'
  },
  itemImage: {
    width: 240,
    height: 240
  },
  itemTextL: {
    fontSize: 40,
    color: '#FFFFFF'
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemDescription: {
    alignItems: 'center',
    marginBottom: 20
  },
  itemStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  abilities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  }
});

export default Pokemon;
