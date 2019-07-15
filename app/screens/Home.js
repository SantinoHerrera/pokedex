import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { user, password } from '../constants/user';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
      alert: ''
    };
  }

  login = () => {
    if (this.state.user == user && this.state.password == password) {
      this.props.navigation.navigate('List');
      this.setState({ user: '', password: '', alert: '' });
    } else {
      this.setState({ alert: 'Wrong username or password' });
    }
  };

  componentDidMount() {
    this.setState({ user: '', password: '' });
  }

  render() {
    const { user, password, alert } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.itemImage}
        />
        <View style={styles.form}>
          <Input
            placeholder='User'
            value={user}
            inputStyle={{ color: 'white' }}
            onChange={e => this.setState({ user: e.nativeEvent.text })}
          />
          <Input
            placeholder='Password'
            value={password}
            secureTextEntry={true}
            inputStyle={{ color: 'white' }}
            onChange={e =>
              this.setState({
                password: e.nativeEvent.text
              })
            }
          />
          <Button title='Login' onPress={this.login} />
        </View>
        {alert ? <Text>{alert}</Text> : <Text />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef5350'
  },
  form: {
    width: 200,
    height: 200,
    justifyContent: 'space-between'
  },
  alert: {
    fontSize: 20,
    marginBottom: 20
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    transform: [{ scaleX: 1.5 }]
  }
});

export default Home;
