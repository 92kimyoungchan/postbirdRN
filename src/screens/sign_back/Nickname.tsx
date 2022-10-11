import React, {useCallback, useState, useEffect, useRef} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import styled, {css} from 'styled-components/native';
import {useNavigation, useRoute} from '@react-navigation/native'
// prettier-ignore
import {View} from '../../theme';
import {SvgXml} from 'react-native-svg'
import * as D from '../../data'

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

export default function Nickname() {
  const route = useRoute()
  // navigation
  const navigation = useNavigation()
  /**  메인으로 보내야함 */
  

  const textInputRef = useRef<TextInput | null>(null);
  const [person, setPerson] = useState<D.IPerson>({
    id: '',
    nickName: '',
    birdName: '',
    postLocation: {},
  })
  const [token, setToken] = useState<string>('');
  const [isInputStatus, setInputStatus] = useState<string>('')
  const initPerson = {
    id: '',
    nickName: '',
    birdName: person.birdName,
    postLocation: person.postLocation,
  }
  const checkNickName = useCallback(() => {
    console.log('가져가요', JSON.stringify(person))
    
  }, []);
  const checkNicknameApi = async (stringParam:string) => {
    await new Promise((resolve, reject) => {
      fetch(`http://58.149.234.98:5555/pbuser/api/v1/user/nickname?nickname=${stringParam}`, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          ContentType: 'application/json',
          Authorization : token,
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log('res :', res);
          if (res) {
            setInputStatus('inputSuccess');
          } else {
            setInputStatus('duplicatedId');
          }
          console.log('nickName :', stringParam)
    console.log('person - insert :', person)
    console.log('person.nickName.length :', person.nickName.length)
          resolve(res)
        })
        .catch(reject)
    })
  }
  const enterJoin = () => {
    if (isInputStatus === 'inputSuccess') {
      navigation.navigate('NoticeJoin', {
        person: person,
      });
    } else {
      Alert.alert('닉네임 검증이 되지 않았습니다.');
    }
  }
  const getTokenParam = async () => {
    let sampleString = 'Bearer ';
    AsyncStorage.getItem('token', (err, result) => {
      sampleString += JSON.stringify(result).replace(/\"/gi, "");
      return sampleString
    })
  }
  const nickNameFilterFunction = async (nickName: string) =>  {
    setPerson(person => ({...person, nickName}));
    const initVal = nickName.replace(/\s/gi, "");
    const isNickName = /^[가-힣|a-z|A-Z|0-9]{2,10}$/;
    if (!isNickName.test(initVal)) {
      /** warn - flag  */
      setInputStatus('inputError');
      return false;
    }
    console.log('교보재 :', token);
    await checkNicknameApi(initVal)
  }
  /**
   * 
   */
  useEffect(() => {
    console.log('초기시작 param nickname :', route.params?.person);
    getTokenParam();
  }, []);
  useEffect(() => {
    console.log('결과값 :', person);
  }, [person]);
  const nickInit = {
    id: person.id,
    nickName: '',
    birdName: person.birdName,
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
  return (
    <View style={[styles.view]}>
      {
        /**
         * <Text style={{
        color: 'red',
      }}>{isInputStatus}</Text>
         */
      }
      <TouchableOpacity
        style={[styles.TouchableOpacityInit]}
        onPress={() => {
          setPerson(initPerson)
          navigation.navigate('Login');
        }}>
        <Text style={styles.cancel}>취소</Text>
      </TouchableOpacity>
      <Text style={styles.title}>닉네임을 {'\n'}등록해주세요.</Text>
      <KeyboardAvoidingView style={{flex: 1}}>
        <TouchableOpacity
          style={styles.deleteIconWrapper}
          onPress={() => {
            setPerson(nickInit)
            console.log('person -delete :', person)
          }}>
          <Image
            style={styles.deleteIcon}
            source={require('../../assets/images/delete_icon.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.inputWrap,
            person.nickName.length > 0 ? styles.inputWrapIng : null,
            person.nickName.length > 2 && isInputStatus === ('inputError' || 'duplicatedId') ? {borderColor: '#ff6160'} :null,
            person.nickName.length > 2 && isInputStatus === 'inputSuccess' ? {borderColor: '#23cc89'} :null,
          ]}
          ref={textInputRef}
          value={person.nickName}
          placeholder="닉네임 입력"
          onChangeText={nickName => nickNameFilterFunction(nickName)}
        />
          <NoticeInputWrap>
            {(isInputStatus === ('inputError' || 'duplicatedId') && person.nickName.length > 2 )? (
              <SvgXml style={[styles.menuIcon]} xml={xml_warn} />
            ) : null}
            {(isInputStatus === 'inputSuccess' && person.nickName.length > 2) ? (
              <SvgXml style={[styles.menuIcon]} xml={xml_success} />
            ) : null}
                <NoticeInput isInputStatus={isInputStatus}>
                {(isInputStatus === 'inputSuccess' && person.nickName.length > 2) ? '사용가능한 닉네임 입니다:)': null}
                {(isInputStatus === 'inputError' && person.nickName.length > 2) ? '2~10자로 한글, 영문, 숫자를 사용할 수 있습니다.': null}
                {(isInputStatus === 'duplicatedId' && person.nickName.length > 2) ? '이미 사용 중인 닉네임입니다.': null}
                </NoticeInput>
                </NoticeInputWrap>  
        <TouchableOpacity style={[styles.bottomBtn, isInputStatus === 'inputSuccess' ? ({
            backgroundColor: '#eb4b34',

          }) : null]} onPress={enterJoin}>
          <Text style={[styles.btnTxt, isInputStatus === 'inputSuccess' ? ({
            color: '#fff',
            fontFamily: 'applesdgothicneob',
            opacity: 1,
          }) : null]}>다음</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
  }
const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: 'applesdgothicneob',
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.26,
    textAlign: 'left',
    color: '#ffffff',
    marginBottom: 28,
  },
  cancel: {
    fontFamily: 'applesdgothicneosb',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.16,
    textAlign: 'right',
    color: '#8d8f91'
  },
  inputWrap: {
    borderRadius: 5,
    backgroundColor: '#464c54',
    paddingHorizontal: 12,
    fontFamily: 'applesdgothicneosb',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.18,
    textAlign: 'left',
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
  TouchableOpacityInit: {
    paddingVertical: 12,
    marginBottom: 65
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
})
