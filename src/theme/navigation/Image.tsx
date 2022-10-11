import React from 'react'
import type {FC, ComponentProps} from 'react'
import {Image as RNImage} from 'react-native';

export type ImageProps = ComponentProps<typeof RNImage> & {
  order?: number,
};
export const Image: FC<ImageProps> = (order, {...props}) => {
  return <RNImage order={order} {...props} />;
}