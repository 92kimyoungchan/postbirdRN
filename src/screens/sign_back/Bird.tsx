import React, {useCallback, useEffect, useState, useRef} from 'react'
import {Alert, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Image, ScrollView} from 'react-native'
// prettier-ignore
import {View} from '../../theme';
import styled, {css} from 'styled-components/native';
import {Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import * as D from '../../data';

const xml_warn = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path data-name="패스 21084" d="M9 0a9 9 0 1 1-9 9 9 9 0 0 1 9-9z" style="fill:#ff6160"/>
    <path data-name="패스 20107" d="M41.818-3445.82a.818.818 0 0 0-.818.82.818.818 0 0 0 .818.818.818.818 0 0 0 .818-.818.818.818 0 0 0-.818-.818m0-1.818a.82.82 0 0 1-.818-.818v-5.726a.82.82 0 0 1 .818-.818.82.82 0 0 1 .818.818v5.726a.82.82 0 0 1-.818.818" transform="translate(-33 3458.592)" style="fill:#fff;stroke:#fff;stroke-width:.5px;fill-rule:evenodd"/>
</svg>
`
const xml_success = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path data-name="패스 21211" d="M9 0a9 9 0 1 1-9 9 9 9 0 0 1 9-9z" style="fill:#23cc89"/>
    <g data-name="그룹 5719">
        <path data-name="패스 20106" d="M7.975 13.141a.6.6 0 0 1-.421-.174l-2.38-2.38a.595.595 0 1 1 .841-.841l1.937 1.937L12.889 6.2a.6.6 0 1 1 .885.8l-5.356 5.944a.6.6 0 0 1-.427.2z" transform="translate(-.823 -.291)" style="fill:#fff;stroke:#fff;stroke-width:.5px"/>
    </g>
</svg>
`;
const BgWidth = ((Dimensions.get('window').width / 2) - 1.5) + 'px';
const BirdInputWrapper = ((Dimensions.get('window').width) - 60);
export default function BirdSetting() {
  const AbBg = styled.View`
    position: absolute;
    top: 0;
    left: ${BgWidth};
    width: 3px;
    height: 128px;
    background: #d7dadc;
  `;
  const BirdName = styled.View`
    height: 50px;
    width: ${BirdInputWrapper};
    border-radius: 5px;
  `;
  // navigation
  const navigation = useNavigation()
  const route = useRoute()
  /**  메인으로 보내야함 */
  
  const textInputRef = useRef<TextInput | null>(null);
  const [person, setPerson] = useState<D.IPerson>({
    id: '',
    nickName: '',
    birdName: '',
    postLocation: {},
  });
  const [isInputStatus, setInputStatus] = useState<string>('');
  const [passedJoin, setPassedJoin] = useState<Boolean>(false);
  const initPerson = {
    id: '',
    nickName: person.nickName,
    birdName: '',
    postLocation: person.postLocation,
  }
  const birdInit = {
    id: person.id,
    nickName: person.nickName,
    birdName: '',
    postLocation: person.postLocation,
  };
  const NoticeInputWrap = styled.View`
  flex-direction: row;
  margin-top: 8.5px;
  align-items: center;
`;
const NoticeInput = styled.Text`
  letter-spacing: -0.14px;
${props => props.isInputStatus === ('inputError'|| 'duplicatedId') && css`
  color: #ff6160;`
  }
  ${props => props.isInputStatus === 'inputSuccess' && css`
  color: #23cc89;`
  }
`;
const checkBirdName = () => {
  if (isInputStatus === 'inputSuccess') {
    navigation.navigate('PostSetting', {
      person: person,
    });
  } else {
    Alert.alert('올바른 버드이름이 작성되지 않았습니다.');
  }
};
const getTokenParam = () => {
  let sampleString = 'Bearer ';
  AsyncStorage.getItem('token', (err, result) => {
    sampleString += JSON.stringify(result).replace(/\"/gi, "");
  })
  return sampleString
}
const checkBirdnameApi = async (stringParam:string) => {
  await new Promise((resolve, reject) => {
    fetch(`http://58.149.234.98:5555/pbbird/api/v1/bird/name?birdName=${stringParam}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json',
        Authorization : getTokenParam(),
      }
    })
      .then(res => res.json())
      .then(res => {
        reject(console.log('뿌잉'));
        if (res) {
          setInputStatus('inputSuccess');
        }
        console.log('res-birdName :', res);
        console.log('birdName :', stringParam);
  console.log('person - insert :', person)
  console.log('person.birdName.length :', person.birdName.length)
        resolve(res)
      })
      .catch(reject)
  })
}
const birdNameFilterFunction = async (birdName: string) => {
                    setPerson(person => ({...person, birdName}));
                    const initVal = birdName.replace(/\s/gi, "");
                    const isBirdName = /^[가-힣|a-z|A-Z|0-9]{2,10}$/;
                    if (!isBirdName.test(initVal)) {
                      /** warn - flag  */
                      setInputStatus('inputError');
                      return false;
                    }
                   await checkBirdnameApi(initVal)
}
  useEffect(() => {
    console.log('받은 친구들 -BirdSetting:', JSON.stringify(route.params?.person));
    setPerson(route.params?.person)
  }, []);
  useEffect(() => {
    console.log('결과값 :', person);
  }, [person]);
  return (
      
    <View style={[styles.view]}>
        
       <AbBg />
       <TouchableOpacity style={{
         position: 'absolute',
         top: 15,
         right: 30,
         justifyContent: 'center',
         alignItems:'center',
         width: 55,
         height: 35,
       }}
       onPress={() => {
        setPerson(initPerson)
        navigation.navigate('NoticeJoin');

        
      }}>
        <Text style={styles.cancel}>취소</Text>
       </TouchableOpacity>
      <Image style={{
                   width: 190,
                   height: 278,
                   marginBottom: 24,
                 }}source={require('../../assets/images/birdnaming.png')} />
                 <Text style={{
                   fontFamily: 'applesdgothicneor',
                   fontSize: 16,
                   lineHeight: 20,
                   letterSpacing: -0.16,
                   color: '#8d8f91',
                   marginBottom: 8,
                 }}>버드에게 이름을 지어주세요!</Text>
              <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
              <TouchableOpacity
                style={styles.deleteIconWrapper}
                onPress={() => {
                  setPerson(birdInit)
                  console.log('person -delete :', person)
                }}>
                <Image
                  style={styles.deleteIcon}
                  source={require('../../assets/images/delete_icon.png')}
                />
              </TouchableOpacity>
                  <TextInput style={[
                    styles.inputWrap,
                    person.birdName.length > 0 ? styles.inputWrapIng : null,
                    person.birdName.length > 2 && isInputStatus === 'inputError' ? {borderColor: '#ff6160'} :null,
                    person.birdName.length > 2 && isInputStatus === 'inputSuccess' ? {borderColor: '#23cc89'} :null,
                  ]}
                  ref={textInputRef}
                  value={person.birdName}
                  placeholder="버드 이름 입력"
                  onChangeText={birdName => birdNameFilterFunction(birdName)}>

                  </TextInput>
                  <NoticeInputWrap>
            {(isInputStatus === ('inputError' || 'duplicatedId') && person.birdName.length > 2 )? (
              <SvgXml style={[styles.menuIcon]} xml={xml_warn} />
            ) : null}
            {(isInputStatus === 'inputSuccess' && person.birdName.length > 2) ? (
              <SvgXml style={[styles.menuIcon]} xml={xml_success} />
            ) : null}
                <NoticeInput isInputStatus={isInputStatus}>
                {(isInputStatus === 'inputSuccess' && person.birdName.length > 2) ? '사용가능한 이름입니다:)': null}
                {(isInputStatus === 'inputError' && person.birdName.length > 2) ? '2~10자로 한글, 영문, 숫자를 사용할 수 있습니다.': null}
                </NoticeInput>
                </NoticeInputWrap>  
               
        <TouchableOpacity style={[styles.bottomBtn, isInputStatus === 'inputSuccess' ? ({
            backgroundColor: '#eb4b34',

          }) : null]} onPress={checkBirdName}>
          <Text style={[styles.btnTxt, isInputStatus === 'inputSuccess' ? ({
            color: '#fff',
            fontFamily: 'applesdgothicneob',
            opacity: 1,
          }) : null]}>완료</Text>
        </TouchableOpacity>
        {
          /**
           * <Text style={{
          color: 'red'
        }}>{JSON.stringify(person)}</Text>
           */
        }
        
              </KeyboardAwareScrollView>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    paddingTop: 128,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  cancel: {
    fontFamily: 'applesdgothicneosb',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.16,
    textAlign: 'right',
    color: '#8d8f91',
  },
  inputWrap: {
    width: BirdInputWrapper,
    borderRadius: 5,
    backgroundColor: '#464c54',
    paddingHorizontal: 12,
    fontFamily: 'applesdgothicneosb',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.18,
    textAlign: 'center',
    color: '#292a2b',
    textDecorationLine: 'none'
  },
  inputWrapIng: {
    backgroundColor: '#464c54',
    color: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 12,
    fontFamily: 'applesdgothicneosb',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.18,
    textAlign: 'left',
    textDecorationLine: 'none',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderStyle: 'solid'
  },
  deleteIcon: {
    width: 18,
    height: 18,
  },
  deleteIconWrapper: {
    position: 'absolute',
    top: 16,
    right: 12,
    zIndex: 1,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  bottomBtn: {
    position: 'absolute',
    width: '100%',
    bottom: 40
  },
  btnTxt: {
    opacity: 0.5,
    fontFamily: 'applesdgothicneosb',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.18,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#eb4b34',
    width: '100%',
    paddingVertical: 16,
    height: 54,
  },
})
