/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// constants
import {currencyByRupee} from './constant';
import CurrencyButton from './components/CurrencyBtn';

import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [inputValue, SetInputValue] = useState('');
  const [resultValue, SetResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const btnPress = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter  a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)} 🤑`;
      SetResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>&#x20B9; </Text>
            <TextInput
              style={styles.textinp}
              maxLength={14}
              value={inputValue}
              clearButtonMode="always"
              onChangeText={SetInputValue}
              keyboardType="number-pad"
              placeholder="Enter amount in rupees"
            />
          </View>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => btnPress(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
  textinp: {
    borderColor: '#C6DCE4',
    // backgroundColor: '#A3D8FF',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default App;
