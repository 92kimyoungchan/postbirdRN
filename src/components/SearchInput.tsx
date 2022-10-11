import React, {forwardRef, useState, useEffect} from 'react'
import type {ForwardRefRenderFunction, ComponentProps} from 'react'
import {StyleSheet, TextInput as RNTextInput, View, TouchableOpacity} from 'react-native'

export type TextInputProps = ComponentProps<typeof RNTextInput> & {
  keywordReturn: any
  initKeyword: string
  statusReturn: any
}

const _TextInput: ForwardRefRenderFunction<RNTextInput, TextInputProps>  = (
  {style, keywordReturn, initKeyword, statusReturn,  ...props },
  ref
) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isTouched, setTouched] = useState<Boolean>(true);
  useEffect(() => {
    console.log('initKeyword :', initKeyword);
    setSearchKeyword(initKeyword);
  }, [initKeyword])
  useEffect(() => {
    console.log('새로운 컴포넌트입니다');
  }, [])
  const keywordEntered = () => {
    keywordReturn(searchKeyword)
  }
  
  return (
  <TouchableOpacity onPress={() => {
    console.log('터치 진입')
    setTouched(!isTouched);
    statusReturn(isTouched)
    }}>
      <View pointerEvents={isTouched ? "none" : 'auto'}>
    <RNTextInput
      ref={ref}
      style={[
        styles.textInput,
        style
      ]}
      placeholder="검색어를 입력하세요"
      placeholderTextColor = "rgb(41,42,43)"
      value={searchKeyword}
      multiline={false} 
      blurOnSubmit={false}
      onSubmitEditing={keywordEntered}
      onChangeText={searchKeyword => {
        setSearchKeyword(searchKeyword);
      }}
      {...props}
    />
    </View>
    </TouchableOpacity>
  )
}
export const SearchInput = forwardRef(_TextInput)
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    fontFamily: 'applesdgothicneosb',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.18,
    color: 'rgb(255,255,255)',
    padding: 0,
    textDecorationLine: 'none',
  }
})
