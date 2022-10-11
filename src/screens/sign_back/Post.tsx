import React, {useCallback, useEffect, useState, useRef} from 'react'
import {Alert, StyleSheet, TouchableOpacity, View, Text, Image, Modal} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import styled, {css} from 'styled-components/native';
// prettier-ignore
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgXml} from 'react-native-svg';
import * as D from '../../data';
import Postcode from '@actbase/react-daum-postcode';
import Geolocation from '@react-native-community/geolocation';
import EModal from "react-native-modal";

const xml_gps = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path style="fill:none" d="M0 0h24v24H0z"/>
    <path d="M20.591 13.409a8.12 8.12 0 0 1-7.182 7.182v1a.909.909 0 1 1-1.818 0v-1a7.954 7.954 0 0 1-7.182-7.182h-1a.909.909 0 0 1 0-1.818h1a7.954 7.954 0 0 1 7.182-7.182v-1a.909.909 0 0 1 1.818 0v1a8.12 8.12 0 0 1 7.182 7.182h1a.909.909 0 1 1 0 1.818zM12.5 18.864A6.364 6.364 0 1 0 6.136 12.5a6.324 6.324 0 0 0 6.364 6.364zm0-2.727a3.636 3.636 0 1 1 3.636-3.637 3.647 3.647 0 0 1-3.636 3.636zm0-1.818a1.818 1.818 0 1 0-1.818-1.819 1.824 1.824 0 0 0 1.818 1.818z" transform="translate(-.836 -.837)" style="fill:#fff"/>
  </svg>
`;
const xml_search =`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
  <path data-name="패스 63" d="M21.54 11.7a6.961 6.961 0 1 0 0 9.845 6.961 6.961 0 0 0 0-9.845zm-1.254 8.591a5.155 5.155 0 1 1 1.535-3.67 5.188 5.188 0 0 1-1.535 3.67zm6.985 5.731L23.553 22.3a.887.887 0 1 0-1.253 1.256l3.717 3.715a.887.887 0 0 0 1.254-1.254z" transform="translate(-5.878 -6.878)" style="fill:#292a2b"/>
  </svg>
`;
const TxtWidth = (Dimensions.get('window').width) - 122;
const ModalMarginHorizontal = ((Dimensions.get('window').width) - 270) /2;
const ModalMarginVertical = ((Dimensions.get('window').height) - 146) /2;
const WholeWidth = Dimensions.get('window').width;
const WholeHeight = Dimensions.get('window').height;
const ButtonWrapperWidth = (Dimensions.get('window').width - 60) + 'px';
export default function Post() {
  const route = useRoute()
  // navigation
  const navigation = useNavigation()
  /**  메인으로 보내야함 */
 
  const [person, setPerson] = useState<D.IUser>({
    id: '',
    nickName: '',
    birdName: '',
    postLocation: {},
  });
  const initPerson = {
    id: '',
    nickName: person.nickName,
    birdName: person.birdName,
    postLocation: {},
  }
  const [isInputStatus, setInputStatus] = useState<boolean>(false);
  const [isPostModal, setPostModal] = useState(false);
  const [isLocatedModal, setLocatedModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLogitude] = useState(null);
  const [passedJoin, setPassedJoin] = useState<Boolean>(false);
  const geoLocation = () => {
      console.log('함수진입');
    Geolocation.getCurrentPosition(
        position => {
            const latitude = JSON.stringify(position.coords.latitude);
            const longitude = JSON.stringify(position.coords.longitude);

            setLatitude(latitude);
            setLogitude(longitude);
            setLocatedModal(true);
            setInputStatus(true);
            const sampleObj = {
              id: person.id,
              nickName: person.nickName,
              birdName: person.birdName,
              postLocation: '공릉동 엘림캐슬 201호',
            }
            
            setPerson(sampleObj)
        },
        error => { console.log(error.code, error.message); },
        {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
    )
}
  const postInit = {
    id: person.id,
    nickName: person.nickName,
    birdName: person.birdName,
    postLocation: {},
  };
  const PostTitle = styled.Text`
  font-family: 'applesdgothicneob';
  font-size: 26px;
  line-height: 34px;
  letter-spacing: -0.26;
  ${props => props.isFullWidth === true && css`
    width: ${ButtonWrapperWidth};
    `}
  color: ${(props) => (props.isFocused ? '#eb4b34' : '#fff')};
`;
  const SearchingArea = styled.View`
    height: 50px;
    flex-direction: row;
    margin-top: 32px;
    margin-bottom: 20px;
  `;
  useEffect(() => {
    console.log('받은 친구들 - postSetting :', JSON.stringify(route.params?.person));
    setPerson(route.params?.person)
  }, []);
  useEffect(() => {
    console.log('결과값 :', person);
  }, [person]);
  const callPostFinder = useCallback(() => {
    setPostModal(true);
  }, []);
  const getPostcode = () => {
    const postCode =  (person.postLocation.address1 + person.postLocation.address2).replace(/'/g,'');
            console.log('person-result :', JSON.stringify(person));
            return postCode
  }
  const getTokenParam = () => {
    let sampleString = 'Bearer ';
    AsyncStorage.getItem('token', (err, result) => {
      sampleString += JSON.stringify(result).replace(/\"/gi, "");
    })
    return sampleString
  }
  const sendPostApi = async () => {
    await nickNameApi(person.nickName);
    await birdNameApi(person.birdName);
    await postBoxApi(person.postLocation);
    navigation.navigate('Login');
  }
  const nickNameApi = async (stringParam: string) => {
    await new Promise((resolve, reject) => {
      fetch('http://58.149.234.98:5555/pbuser/api/v1/user/nickname', {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          ContentType: 'application/json',
          Authorization : getTokenParam(),
        },
        body: JSON.stringify({
          nickname: stringParam,
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log('res - nickName Api :', res)
          resolve(res)
        })
        .catch(reject)
    })
  }
  const birdNameApi = async (stringParam: string) => {
    await new Promise((resolve, reject) => {
      fetch('http://58.149.234.98:5555/pbbird/api/v1/bird/name', {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          ContentType: 'application/json',
          Authorization : getTokenParam(),
        },
        body: JSON.stringify({
          birdName: stringParam,
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log('res - birdName Api :', res)
          resolve(res)
        })
        .catch(reject)
    })
  }
  const postBoxApi = async (objectParam: object) => {
    await new Promise((resolve, reject) => {
      fetch('http://58.149.234.98:5555/pbpostbox/api/v1/postbox', {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          ContentType: 'application/json',
          Authorization : getTokenParam(),
        },
        body: JSON.stringify({
          address1: objectParam.address1,
          address2: objectParam.address2,
          latitude: 0,
          longitude: 0,
          zipcode: objectParam.zonecode,
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log('res - postBox Api :', res)
          resolve(res)
        })
        .catch(error => {
          console.log(error);
        })
    })
  }
  return (
    <View style={[styles.view]}>
      <TouchableOpacity
        style={[styles.TouchableOpacityInit]}
        onPress={() => {
          setPerson(initPerson)
          navigation.navigate('BirdSetting');
        }}>
        <Text style={styles.cancel}>취소</Text>
      </TouchableOpacity>

      <Text style={{fontSize: 34, color: '#fff'}}>{isLocatedModal}</Text>
      <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          }}>
                <PostTitle isFocused={true}>
                  우체통
                </PostTitle>
                <PostTitle>
                  을
                </PostTitle>
                </View>
                <PostTitle isFullWidth={true}>
                  어디에 설치할까요?
                </PostTitle>
        <SearchingArea>
          <Text style={{
            width: TxtWidth,
            height: 50,
            backgroundColor: 'rgb(70,76,84)',
            paddingHorizontal: 12,
            paddingVertical: 15,
            fontSize: 18,
            lineHeight: 22,
            letterSpacing: -0.18,
            color: 'rgb(41,42,43)',
            fontFamily: 'applesdgothicneosb',
          }}>
            {Object.keys(person.postLocation).length > 0 ? getPostcode : null}
          </Text>
          <TouchableOpacity style={{
            width: 50,
            height: 50,
            marginLeft: 12,
            backgroundColor: '#fff',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={callPostFinder}
          >
          <SvgXml style={{
            width: 24,
            height: 24,
          }} xml={xml_search} />
          </TouchableOpacity>
        </SearchingArea>
        <TouchableOpacity activeOpacity={0.8} style={{
          flexDirection: 'row',
          height: 50,
          borderColor: '#ffffff',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',

        }} onPress={geoLocation}>
          <Image
            style={{width: 24, height: 24, marginRight: 4}}
            source={require('../../assets/images/gps_icon.png')}
          />
          <Text style={{
            fontFamily: 'applesdgothicneosb',
            fontSize: 16,
            lineHeight: 20,
            letterSpacing: -0.16,
            color: '#fff',
          }}>현 위치로 주소 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomBtn, isInputStatus === true ? ({
            backgroundColor: '#eb4b34',

          }) : null]} onPress={() => {
            sendPostApi()
          }}>
          <Text style={[styles.btnTxt, isInputStatus === true ? ({
            color: '#fff',
            fontFamily: 'applesdgothicneob',
            opacity: 1,
          }) : null]}>완료</Text>
        </TouchableOpacity>
        <EModal visible={isLocatedModal} style={{padding: 0, margin: 0}}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
            <View style={{ 
            height: 146, 
            width: 270, 
            position: 'absolute',
            marginHorizontal: ModalMarginHorizontal,
            marginVertical: ModalMarginVertical,
            backgroundColor: 'rgb(30, 30, 30)',
            borderRadius: 14,
            overflow: 'hidden',
            }}>
              <View style={{
                padding: 20,
              }}>
                  <Text style={{color: '#fff'}}> latitude: {latitude} </Text>
                  <Text style={{color: '#fff'}}> longitude: {longitude} </Text>
              </View>
              <TouchableOpacity style={{
                position: 'absolute',
                bottom: 0,
                height: 44,
                width: '100%',
                backgroundColor: 'transparent',
                borderTopWidth: 1,
                borderTopColor: 'rgba(84, 84, 88, 0.65)',
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={() => {
                setLocatedModal(false);
              }}>
                <Text style={{
                  color: 'rgb(10, 132, 255)',
                  fontFamily: 'applesdgothicneob',
                  fontSize: 16,
                  lineHeight: 20,
                  letterSpacing: -0.32,
                }}>확인</Text>
              </TouchableOpacity>
           </View>
          </View>
      </EModal>
        
        
        <Modal visible={isPostModal}>
        <Postcode
          style={{ width: WholeWidth, height: WholeHeight }}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={data => {
            console.log('가용 데이터:', data);
            /**
            const getPostcode =  JSON.stringify(data.address + data.buildingName);
            console.log('get-postcode :', getPostcode.replace(/'/g,''));
             */
            const postObj = {
              address1: data.address,
              address2: data.buildingName,
              zipcode: data.zonecode
            }
            console.log('허이짜 :', postObj);
            const sampleObj = {
              id: person.id,
              nickName: person.nickName,
              birdName: person.birdName,
              postLocation: postObj,
            }
            
            setPerson(sampleObj)
            setInputStatus(true);
            setPostModal(false);
          } } onError={function (error: unknown): void {
            throw new Error('Function not implemented.');
          } }        />
          </Modal>
         
        </View>
  )
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 111,
    paddingHorizontal: 30,
  },
  TouchableOpacityInit: {
    position: 'absolute',
    top: 15,
    right: 30,
    width: 55,
    height: 30,
    justifyContent: 'center',
  },
  cancel: {
    fontFamily: 'applesdgothicneosb',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.16,
    textAlign: 'right',
    color: '#8d8f91'
  },
  bottomBtn: {
    position: 'absolute',
    width: '100%',
    bottom: 40,
    left: 30,
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
