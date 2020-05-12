import React, { Component } from "react";
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput
} from "react-native";
import Input from '~/Components/Input';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class HelperRegister extends React.Component<Props> {
  constructor(props : Props) {
    super(props);
    this.state = {
      inputs: {
        first_name: {
          type: "generic",
          value: ""
        },
        last_name: {
          type: "generic",
          value: ""
        },
        birthday_month: {
          type: "month",
          value: ""
        },
        birthday_day: {
          type: "day",
          value: ""
        }
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
              }}
            />
          </View>

          <View>
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
              }}
            />
          </View>

          <View>
            <Text>Birthday?</Text>
            <View style={styles.split}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Month"
                  onChangeText={value => {
                  }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Day"
                  onChangeText={value => {
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.button}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    alignSelf: "stretch"
  },
  split: {
    flexDirection: "row"
  },
  error: {
    position: "absolute",
    bottom: 0,
    color: "red",
    fontSize: 12
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
  }
})

export default HelperRegister;
