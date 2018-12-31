import React from 'react';
import { Text, FlatList, WebView, Linking, View } from 'react-native';
import { List, ListItem, Header } from 'react-native-elements'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }


  componentDidMount() {
    this._executeQuery('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0cc80c7550c54f2f84647fc007894443');
  }

  _executeQuery(url) {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({data: response.articles})
      })
      .catch(error => console.log(error))
  }

  _onClickItem(url) {
    console.log(url);
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render() {
    console.log(this.state.data);
    return (
      <View>
        <Header centerComponent={{ text: 'MY FAVORITE NEWS', style: { color: '#fff' } }} />
        <List>
          <FlatList
            data={this.state.data}
            renderItem={({item}) =>
              <ListItem
                roundAvatar
                title={item.title}
                subtitle={item.description}
                avatar={{uri: item.urlToImage}}
                titleNumberOfLines={0}
                subtitleNumberOfLines={0}
                onPress={() => this._onClickItem(item.url)}
              />
            }
          />
        </List>
      </View>
    );
  }
}
