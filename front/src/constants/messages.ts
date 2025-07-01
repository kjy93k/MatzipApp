export const errorMassages = {
  CANNOT_GET_ADDRESS: '주소를 확인할 수 없습니다.',
} as const;

export const alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한이 필요합니다.',
    DESCRIPTION: '설정 화면에서 위치 권한을 허용해주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 접근 권한이 필요합니다.',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해주세요.',
  },
  NOT_SELECTED_LOCATION: {
    TITLE: '추가할 위치를 선택해주세요.',
    DESCRIPTION: '지도를 길게 누르면 위치가 선택됩니다.',
  },
  IMAGE_COUNT_EXCEEDED: {
    TITLE: '이미지 개수를 초과하였습니다.',
    DESCRIPTION: '추가 가능한 이미지는 최대 5개입니다.',
  },
} as const;
