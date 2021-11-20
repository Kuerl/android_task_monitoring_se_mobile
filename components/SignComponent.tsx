import React, { useState } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { signform } from '../constants/Constant';

export default function SignComponent(
    {sign, form, setForm}: {sign: string, form: any, setForm: Function}
  ) {
  return (
    <>
      <TouchableOpacity style={signStyle.container} onPress={() => {
        if(sign === 'SIGN IN') {
          setForm(signform.in)
        } else {setForm(signform.up)}
      }} >
        <Text style={signStyle.__sign}>{sign}</Text>
      </TouchableOpacity>
    </>
  );
}

const signStyle = StyleSheet.create({
  container: {
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  __sign: {
    fontSize: 25,
    fontWeight: '100',
    fontFamily: 'GloryM',
    color: 'white',
  }
});
