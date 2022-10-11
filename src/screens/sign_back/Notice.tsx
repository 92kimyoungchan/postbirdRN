import React, {useCallback, useEffect} from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
// prettier-ignore
import {View} from '../../theme';
import Carousel from '../../utils/Carousel';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
export default function NoticeJoin() {
  const PAGES = [
    {},
    {},
    {}
  ];
  // navigation
  const navigation = useNavigation()
  /**  메인으로 보내야함 */
  const route = useRoute();
  useEffect(() => {
    console.log('param :', route.params?.person);
  }, []);
  const routerCallReceived = (type: string) => {
    console.log('건네온 라우터 파람 : ', type);
    navigation.navigate('BirdSetting', {
      person: route.params?.person,
    });
  }
  return (
    <View style={[styles.view]}>
      {
        /**
         * <View style={[styles.textArea]}>
        <Text style={styles.subTitle}>아무개님</Text>
        <Text style={styles.title}>
          안녕하세요:){'\n'}포스트버드에 오신 것을{'\n'}환영합니다.
        </Text>
      </View>
      <View style={styles.bottomView}>
        
      </View>
         */
      }
      <Carousel
    gap={0}
    offset={0}
    routerCall={routerCallReceived}
    pages={PAGES}
    pageWidth={windowWidth}
  />
      </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  textArea: {
    marginTop: 94
  },
  subTitle: {
    fontFamily: 'applesdgothicneor',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: -0.16,
    textAlign: 'left',
    color: '#8d8f91',
    marginBottom: 6,
  },
  title: {
    fontFamily: "applesdgothicneob",
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.26,
    textAlign: "left",
    color: '#ffffff',
  },
  bottomView: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 30,
    backgroundColor: 'red',
    width: '100%',
    height: 102,
    left: 30,
  },
  dotSection: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: 'blue',
  },
  dotActivated: {
    width: 16,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  dot2: {

  },
  dot3: {

  }
})
