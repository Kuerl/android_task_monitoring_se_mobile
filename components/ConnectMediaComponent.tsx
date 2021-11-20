import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';

export default function ConnectMediaComponent({image}: {image: any}) {
  return (
    <>
      <TouchableOpacity style={connectMediaStyle.container} >
        <Image source={image} style={connectMediaStyle.__media__logo} />
      </TouchableOpacity>
    </>
  );
}

const connectMediaStyle = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(189, 215, 238, 0.77)',
    width: 100,
    height: 55,
    margin: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  __media__logo: {
    height: 30,
    width: 30,
  },
});
