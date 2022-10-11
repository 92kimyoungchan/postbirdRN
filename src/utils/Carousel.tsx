import React, {useState, useRef} from 'react';
import {FlatList, Text, View, StyleSheet, Image} from 'react-native';
import styled, {css} from 'styled-components/native';
import Page from './Page';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {SvgXml} from 'react-native-svg'

const xml_post =`
<svg id="onboarding2" xmlns="http://www.w3.org/2000/svg" width="184.312" height="315.604">
<defs>
    <style>
        .cls-2{fill:#eb4b34}.cls-3{fill:#e9351b}.cls-5{fill:#ca290e}.cls-6{fill:#590000}
    </style>
</defs>
<g id="그룹_9789" data-name="그룹 9789" transform="translate(-242.178 -233.431)" style="opacity:.8">
    <g id="그룹_9787" data-name="그룹 9787" transform="translate(242.178 233.431)">
        <path id="패스_21216" data-name="패스 21216" class="cls-2" d="M426.49 253.5c0-6.6-1.783-20.064-11.95-20.064H254.126c-10.168 0-11.948 13.464-11.948 20.064v32.454H426.49z" transform="translate(-242.178 -233.431)"/>
        <path id="패스_21217" data-name="패스 21217" class="cls-3" d="M242.178 267.448v179.905a11.949 11.949 0 0 0 11.948 11.947H414.54a11.949 11.949 0 0 0 11.95-11.948V267.448z" transform="translate(-242.178 -214.93)"/>
    </g>
    <path id="사각형_6702" data-name="사각형 6702" transform="translate(242.178 281.194)" style="fill:#ef6e5b" d="M0 0h184.311v9.51H0z"/>
    <g id="그룹_9788" data-name="그룹 9788" transform="translate(251.918 290.704)">
        <path id="사각형_6703" data-name="사각형 6703" class="cls-5" d="M0 0h78.357v56.731H0z"/>
        <path id="사각형_6704" data-name="사각형 6704" class="cls-5" transform="translate(88.098)" d="M0 0h78.356v56.731H0z"/>
        <path id="패스_21218" data-name="패스 21218" class="cls-6" d="M303.865 270.528h-51.59a15.07 15.07 0 0 0 15.07 15.07h36.52a15.068 15.068 0 0 0 15.068-15.07z" transform="translate(-246.427 -270.528)"/>
        <path id="사각형_6705" data-name="사각형 6705" class="cls-2" transform="translate(0 28.366)" d="M0 0h78.357v28.366H0z"/>
        <path id="패스_21219" data-name="패스 21219" class="cls-6" d="M360.928 270.528h-51.59a15.071 15.071 0 0 0 15.071 15.07h36.519A15.07 15.07 0 0 0 376 270.528z" transform="translate(-215.391 -270.528)"/>
        <path id="사각형_6706" data-name="사각형 6706" class="cls-2" transform="translate(88.098 28.366)" d="M0 0h78.356v28.366H0z"/>
    </g>
    <path id="패스_21220" data-name="패스 21220" d="m334.158 355.031 17.395-8.674h-34.239l18.286-13.285h-41.9c-3.63 0-5.754 1.93-5.827 4.857 0 2.676.922 3.957 6.707 8.6l-14.724 8.5 14.724 8.5c-5.785 4.646-6.707 5.927-6.707 8.6.073 2.926 2.2 4.857 5.827 4.857h41.9L317.314 363.7h34.239zm-39.281 8.255v-16.51c2.517 2.015 5.912 4.644 10.5 8.255l11.393-8.275v16.55l-11.393-8.275c-4.589 3.611-7.983 6.238-10.5 8.255z" transform="translate(20.49 54.193)" style="fill:#fff"/>
    <path id="사각형_6707" data-name="사각형 6707" class="cls-3" transform="translate(257.767 538.87)" d="M0 0h154.757v10.165H0z"/>
    <path id="사각형_6708" data-name="사각형 6708" class="cls-5" transform="translate(304.698 477.802)" d="M0 0h60.897v61.068H0z"/>
</g>
</svg>

`;
const ItemWidth = (Dimensions.get('window').width) + 'px';
const ItemHeight = (Dimensions.get('window').height) + 'px';
const ButtonWrapperWidth = (Dimensions.get('window').width - 60) + 'px';
const NextBtnWidth = (Dimensions.get('window').width - 175) + 'px';

interface ICarousel {
  routerCall: any;
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${(props) => (props.focused ? '#fff' : '#464c54')};
  width: ${(props) => (props.focused ? '24px' : '6px')};
  height: 6px;
  border-radius: 3px;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  bottom: 134px;
  display: flex;
`;
const CurrentNotice = styled.View`
  flex-direction: row;
  bottom: 18px;
  right: 18px;
  background: #fff;
  position: absolute;
  display: flex;
  padding: 0px 8px;
  border-radius: 8px;
`;
const NoticeTxt = styled.Text`
  font-family: 'SpoqaHanSansNeo-Medium';
  font-size: 12px;
  line-height: 27px;
  letter-spacing: 0;
  color: #101010;
`;
const ItemWrapper = styled.View`
  flex: 1;
  background-color: transparent;
  width: ${ItemWidth};
  height: ${ItemHeight};
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 30px;
  ${props => props.index === 0 && css`
    padding-top: 94px;`
    }
     ${props => props.index === 1 && css`
    padding-top: 94px;`
    }
    ${props => props.index === 2 && css`
    padding-top: 48px;`
    }
`;
const WelcomeUser = styled.Text`
  font-family: 'applesdgothicneor';
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.16;
  color: #8d8f91;
  margin-bottom: 6px;
`;
const ButtonSet = styled.View`
  position: absolute;
  bottom: 40px;
  flex-direction: row;
  left: 30px;
  width: ${ButtonWrapperWidth};
  background-color: transparent;
  align-items: center;
`;
const SkipBtn = styled.TouchableOpacity`
  width: 55px;
  margin-right: 60px;
  background-color: transparent;
`;
const NextBtn = styled.TouchableOpacity`
  width: ${NextBtnWidth};
  height: 54px;
  background-color: #eb4b34;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid;
  ${props => props.isAlone === true && css`
    width: ${ButtonWrapperWidth};
    `}
  isAlone
`;
const NotificationPost = styled.View`
  align-items: center;
`;
const PostTitle = styled.Text`
  font-family: 'applesdgothicneob';
  font-size: 26px;
  line-height: 34px;
  letter-spacing: -0.26;
  ${props => props.isFullWidth === true && css`
    width: ${ButtonWrapperWidth};
    text-align: center
    `}
  color: ${(props) => (props.isFocused ? '#eb4b34' : '#fff')};
`;
export default function Carousel({pages, pageWidth, gap, offset, routerCall}: ICarousel) {
  const [page, setPage] = useState(0);
  const flatListRef = useRef<FlatList | null>(null)
  const navigation = useNavigation()

 function renderItem({index}: any) {
     if (index === 0) {
         return (
             <ItemWrapper index={index}>
               <WelcomeUser>
                 {
                   /** 아이디 가져와서 넣고 + 님 */
                 }
                 영잔디스님
               </WelcomeUser>
               <View>
                 <Text style={[styles.notification]}>
                 안녕하세요:){'\n'}포스트버드에 오신 것을{'\n'}환영합니다.
                 </Text>
               </View>
               <ButtonSet>
                 <SkipBtn onPress={() => {
                  routerCall('BirdSetting')       
                 }}>
                  <Text style={{
                    fontFamily: 'applesdgothicneosb',
                    fontSize: 16,
                    lineHeight: 22,
                    letterSpacing: -0.16,
                    color: '#8d8f91'
                  }}>
                    건너뛰기
                  </Text>
                 </SkipBtn>
                 <NextBtn onPress={() => {
                   flatListRef.current?.scrollToIndex({ animated: true, index: 1 });
                 }}>
                 <Text style={{
                    fontFamily: 'applesdgothicneosb',
                    fontSize: 18,
                    lineHeight: 22,
                    letterSpacing: -0.18,
                    color: '#fff'
                  }}>
                    다음
                  </Text>
                 </NextBtn>
               </ButtonSet>
             </ItemWrapper>
         )
     } else if (index === 1) {
        return (
          <ItemWrapper index={index}>
            <NotificationPost>
              <View style={{flexDirection: 'row'}}>
                <PostTitle isFocused={true}>
                  나만의 우체통
                </PostTitle>
                <PostTitle>
                  을 설치하여
                </PostTitle>
                </View>
                <PostTitle isFullWidth={true}>
                  편지를 주고받아 보세요.
                </PostTitle>
                <Text style={{
                  marginTop: 20,
                  fontFamily: 'applesdgothicneor',
                    fontSize: 16,
                    lineHeight: 20,
                    letterSpacing: -0.16,
                    color: '#8d8f91'
                }}>
                 읽고 싶은 편지만 꺼내서 볼 수 있어요.{'\n'}간직하고 싶은 편지는 보관함으로 쏙!
                 </Text>
                 <Image style={{
                   marginTop: 36.4,
                   width: 185,
                   height: 316,
                 }}source={require('../assets/images/onboarding2.png')} />
            </NotificationPost>
            <ButtonSet>
                 <SkipBtn onPress={() => {
                  routerCall('BirdSetting')
                 }}>
                  <Text style={{
                    fontFamily: 'applesdgothicneosb',
                    fontSize: 16,
                    lineHeight: 22,
                    letterSpacing: -0.16,
                    color: '#8d8f91'
                  }}>
                    건너뛰기
                  </Text>
                 </SkipBtn>
                 <NextBtn onPress={() => {
                   flatListRef.current?.scrollToIndex({ animated: true, index: 2 });
                 }}>
                 <Text style={{
                    fontFamily: 'applesdgothicneosb',
                    fontSize: 18,
                    lineHeight: 22,
                    letterSpacing: -0.18,
                    color: '#fff'
                  }}>
                    다음
                  </Text>
                 </NextBtn>
               </ButtonSet>
            </ItemWrapper>
        );
     } else {
      return (
        <ItemWrapper index={index}>
        <Image style={{
                   width: 315,
                   height: 328,
                   marginBottom: 28,
                 }}source={require('../assets/images/onboarding3.png')} />
                 <View style={{flexDirection: 'row', marginTop: 28, marginBottom: 20, justifyContent: 'center'}}>
                <PostTitle isFocused={true}>
                  버드
                </PostTitle>
                <PostTitle>
                  가 편지를 전달해줘요.
                </PostTitle>
                </View>
                <Text style={{
                  marginTop: 20,
                  fontFamily: 'applesdgothicneor',
                    fontSize: 16,
                    lineHeight: 20,
                    letterSpacing: -0.16,
                    color: '#8d8f91',
                    textAlign: 'center',
                }}>버드의 위치가 궁금할 땐, 버드의 시선을 통해{'\n'}실시간으로 위치를 확인해보세요.</Text>
                <ButtonSet>
                 
                 <NextBtn isAlone={true} onPress={() => {
                  routerCall('BirdSetting')
                 }}>
                 <Text style={{
                    fontFamily: 'applesdgothicneosb',
                    fontSize: 18,
                    lineHeight: 22,
                    letterSpacing: -0.18,
                    color: '#fff'
                  }}>
                    버드를 만나러 가볼까요?
                  </Text>
                 </NextBtn>
               </ButtonSet>
          </ItemWrapper>
      );
   }
    
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        ref={flatListRef}
        data={pages}
        decelerationRate="fast"
        horizontal
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <IndicatorWrapper>
        {Array.from({length: pages.length}, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </IndicatorWrapper>
      {/**
       * 
       * 
       */}
    </Container>
  );
}
const styles = StyleSheet.create({
  notification: {
    fontFamily: 'applesdgothicneob',
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.26,
    color: '#fff',
  },
  txt: {

  }
})