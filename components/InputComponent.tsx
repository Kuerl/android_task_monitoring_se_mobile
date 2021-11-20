import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function InputComponent(
  { type, state, setState, setDisplay } :
  { type: string, state: any, setState: Function, setDisplay: Function }
) {
  const [focus, setFocus] = useState(false);
  return(
      <>
        <TextInput 
          style={focus ? inputStyle.focus : inputStyle.input}
          value={state.username} placeholder={type}
          onChangeText={(state) => setState(state)}
          onFocus={() => {setFocus(true), setDisplay(() => ({onEdit: true, edited: true}))}}
          onBlur={() => {setFocus(false); setDisplay((prevstate: any) => ({...prevstate, onEdit: false}))}}
          secureTextEntry={type === 'Password' ? true : false}
          // secureTextEntry={true}
        />
      </>
  );
}

const inputStyle = StyleSheet.create({
  input: {
    height: 40,
    width: 290,
    margin: 10,
    fontFamily: 'GloryM',
    borderColor: '#243B55',
    borderWidth: 2,
    backgroundColor: 'white',
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
  },
  focus: {
    height: 40,
    width: 290,
    margin: 10,
    fontFamily: 'GloryM',
    borderColor: '#6A1066',
    borderWidth: 2,
    backgroundColor: 'white',
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
  },
});
