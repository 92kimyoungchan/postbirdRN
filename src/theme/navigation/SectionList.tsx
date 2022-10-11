import React from 'react'
import type {FC, ComponentProps} from 'react'
import {SectionList as RNSectionList} from 'react-native'

interface ArrayType {
  id: number;
  thumbnail: string;
  title: string;
  designScore: number;
  experienceScore: number;
  reviewComment: string;
}
export type SectionListProps = ComponentProps<typeof RNSectionList> & {
  section: Array<ArrayType>
}

export const SectionList: FC<SectionListProps> = ({...props}) => {
  return <RNSectionList {...props} />;
}
