import {useCallback} from 'react';
import {Animated} from 'react-native';
import type {
  StackCardInterpolationProps,
  StackCardInterpolatedStyle,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';

export const useNavigationHorizontalInterpolator =
  (): StackCardStyleInterpolator => {
    console.log('interpol 진입');
    const interpolator = useCallback(
      (props: StackCardInterpolationProps): StackCardInterpolatedStyle => {
        const {current, inverted, layouts} = props;
        console.log('props :', props);
        return {
          cardStyle: {
            transform: [
              {
                translateX: Animated.multiply(
                  current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                  inverted,
                ),
              },
            ],
          },
        };
      },
      [],
    );
    return interpolator;
  };
