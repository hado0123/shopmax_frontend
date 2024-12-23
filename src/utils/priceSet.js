// 콤마 추가 (입력 필드용)
export const formatWithComma = (value) => {
   if (!value) return '' // 빈 값 처리
   return Number(value.replace(/,/g, '')).toLocaleString('ko-KR')
}

// 가격 콤마제거 (상태 값용)
export const stripCommas = (value) => {
   return value.replace(/,/g, '') // 콤마 제거
}
