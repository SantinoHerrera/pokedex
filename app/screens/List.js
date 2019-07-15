import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { url, urlImage } from '../constants/url';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataToRender: [],
      filteredData: [],
      offset: 0,
      isLoading: false,
      search: ''
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getData);
  }

  getData = async () => {
    const urlList = `${url}?limit=807&offset=0`;
    await fetch(urlList)
      .then(Response => Response.json())
      .then(responseJson =>
        this.setState({
          data: this.state.data.concat(responseJson.results),
          isLoading: false
        })
      );

    await this.setState({
      filteredData: this.state.data
    });

    this.setState({
      dataToRender: this.state.filteredData.slice(
        this.state.offset,
        this.state.offset + 10
      )
    });
  };

  getDataToRender = () => {
    this.setState({
      dataToRender: this.state.dataToRender.concat(
        this.state.filteredData.slice(this.state.offset, this.state.offset + 10)
      )
    });
  };

  changeOffset = () => {
    this.setState({ offset: this.state.offset + 10 });
  };

  handleLoadMore = async () => {
    await this.changeOffset();
    this.setState({ isLoading: true }, this.getDataToRender);
  };

  returnFooter = () => {
    return this.state.isLoading ? (
      <View>
        <ActivityIndicator size='large' />
      </View>
    ) : null;
  };

  updateSearch = async search => {
    await this.setState(
      {
        search: search,
        isLoading: true
      },
      this.filterData
    );
  };

  filterData = async () => {
    this.setState(
      {
        filteredData: this.state.data.filter(item =>
          item.name.includes(this.state.search)
        )
      },
      this.onClear
    );
  };

  onClear = () => {
    this.setState({ dataToRender: [], offset: 0 }, this.getDataToRender);
  };

  renderRow = ({ item }) => {
    const number = item.url.substring(34).replace('/', '');

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Pokemon', { number: number })
          }
        >
          <Image
            source={{
              uri: `${urlImage}${number}.png`
            }}
            style={styles.itemImage}
          />
        </TouchableOpacity>
        <Text style={styles.itemText}>{`N°${number}`}</Text>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  render() {
    const { dataToRender, search } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder='Search by name'
          onChangeText={this.updateSearch}
          value={search}
          onClear={this.onClear}
        />
        <FlatList
          data={dataToRender}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderRow}
          onEndReached={this.handleLoadMore}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ef5350',
    flex: 1
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
  item: {
    margin: 10,
    justifyContent: 'center'
  },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F2F2F2'
  },
  itemText: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  columnWrapper: {
    justifyContent: 'space-around'
  }
});

export default List;
