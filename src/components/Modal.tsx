import React, { useState, useEffect, useCallback } from "react";
import type {FC, ComponentProps, ReactNode} from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native'

const modalWrapperWidth = (Dimensions.get('window').width) + 'px';
const modalWrapperHeight = (Dimensions.get('window').height) + 'px';
const inModalWidth = (Dimensions.get('window').width- 50) + 'px';
const inBtnWidth = (Dimensions.get('window').width- 98) + 'px';


export type ModalSampleProps = ComponentProps<typeof Modal> & {
  onCreate: any;
  onNavigate: any;
  title: string;
  content: string;
  activeBtnName: string;
  cancleBtnName: string;
  actOpt: string;
}

export const ModalSample: FC<ModalSampleProps> = ({
  onCreate,
  onNavigate,
  title,
  content,
  activeBtnName,
  cancleBtnName,
  actOpt,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    console.log('팝업 로드됨');
  }, []);

  const goRouter = useCallback(() => {
    onNavigate(!modalVisible)
  },[]);
  
  const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  position: absolute;
  width: ${modalWrapperWidth};
  height: ${modalWrapperHeight};
  align-items: center;
  background-color: ${props => (props.status ? 'rgba(16,16,16,0.6)' : 'transparent')};
`;
const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
const ModalView = styled.View`
  width:${inModalWidth};
`;
const CancleBtn = styled.TouchableOpacity`
  width:${inBtnWidth};
`;

const BtnWrapper = styled.TouchableOpacity`
  width:${inBtnWidth};
  height: 48;
  justify-content: center;
  align-items: center;
  border-radius: 8;
  background-color: ${props => (props.isActive ? '#90b7de' : 'transparent')};
  border: ${props => (props.isActive ? '1px solid #90b7de' : '1px solid #101010')};
  margin-top: ${props => props.isActive ? 0 : '8px'};
`;

  return (
    <ModalWrapper status={modalVisible}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ContentBox>
          <ModalView style={[styles.modalView]}>
            <Text style={{
               fontFamily: 'SpoqaHanSansNeo-Bold',
               fontSize: 16,
               lineHeight: 20,
               textAlign: 'center',
               color: '#101010',
               marginTop: 12,
            }}>
              {title}
            </Text>
            <Text style={{
              fontFamily: 'SpoqaHanSansNeo-Medium',
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
              color: '#101010',
              marginTop: 4,
            }}>
              {content}
            </Text>
            <View style={{
              marginTop: 24,
            }}>
            {actOpt === 'router' ? (
              <BtnWrapper isActive={true} onPress={() => {
                goRouter()
              }}>
                <Text style={{
                  color: '#fff',
                  fontFamily: 'SpoqaHanSansNeo-Bold',
                  fontSize: 14,
                  lineHeight: 20,
                  textAlign: 'center',
                }}>{activeBtnName}</Text>
            </BtnWrapper>
            ) : null
            }
            <BtnWrapper isActive={false} onPress={() => {
                setModalVisible(!modalVisible)
                onCreate(!modalVisible)
              }}>
                <Text style={{
                  color: '#101010',
                  fontFamily: 'SpoqaHanSansNeo-Bold',
                  fontSize: 14,
                  lineHeight: 20,
                  textAlign: 'center',
                }}>{cancleBtnName}</Text>
                
            </BtnWrapper>
            </View>
            
          </ModalView>
        </ContentBox>
      </Modal>
      {
        /**
         * 
         * <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
         */
      }
      
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'yellow',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

