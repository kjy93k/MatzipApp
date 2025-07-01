export type MarkerColor = (typeof MarkerColors)[keyof typeof MarkerColors];

export const MarkerColors = {
  RED: 'RED',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  PURPLE: 'PURPLE',
} as const;

export type Category = {
  [key in MarkerColor]: string;
};

export interface ImageUri {
  id?: number;
  uri: string;
}

export interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

export interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

export interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}
