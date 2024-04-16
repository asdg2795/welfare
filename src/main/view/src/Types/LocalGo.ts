import {KoreanRegion} from "./Kr";

const LocalURL = 'http://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations'
/* 요청 */
enum LifeArray { /* 생애주기 */
	INFANT='001' /* 영유아 */,
	CHILD='002' /* 아동 */,
	TEENAGER='003' /* 청소년 */,
	YOUTH='004' /* 청년 */,
	MIDDLE='005' /* 중장년 */,
	OLD='006' /* 노년 */,
	PREGNANT ='007' /* 임신/출산 */,
}
enum TargetIndividualArray{ /* 가구상황 */
	MULTI_CULTURAL='010' /* 다문화 / 탈북민 */,
	MULTI_CHILD='020' /* 다자녀 */,
	WAR_HERO='030' /* 보훈 대상자 */,
	DISABLED='040' /* 장애인 */,
	LOW_INCOME='050' /* 저소득*/,
	SINGLE_PARENT='060' /* 한부모,조손 */
}
enum InterestThemaArray { /* 관심주제 */
	PHYSICAL_HEALTH = '010' /* 신체건강 */,
	MENTAL_HEALTH = '020' /* 정신건강 */,
	LIVING_SUPPORT = '030' /* 생활지원 */,
	HOUSING = '040' /* 주거 */,
	EMPLOYMENT = '050' /* 일자리 */,
	CULTURE_LEISURE = '060' /* 문화·여가 */,
	SAFETY_CRISIS = '070' /* 안전·위기 */,
	PREGNANCY_CHILDBEARING = '080' /* 임신·출산 */,
	CHILD_CARE = '090' /* 보육 */,
	EDUCATION = '100' /* 교육 */,
	ADOPTION_FOSTER = '110' /* 입양·위탁 */,
	PROTECTION_CARE = '120' /* 보호·돌봄 */,
	PEOPLE_FINANCE = '130' /* 서민금융 */,
	LEGAL = '140' /* 법률 */,
}
enum WelfareInfoDetailCode { /* 서비스 구분 코드 */
	INQUIRY = '010' /* 문의 */,
	WEBSITE = '020' /* 사이트 */,
	LEGAL_BASIS = '030' /* 근거법령 */,
	FORM_DOCUMENT = '040' /* 서식/자료 */,
}
enum SearchKeyCode { /* 검색 분류 */
	SERVICE_NAME = '001' /* 서비스명 */,
	SERVICE_CONTENT = '002' /* 서비스내용 */,
	SERVICE_NAME_CONTENT = '003' /* 서비스명+서비스내용 */,
}
enum ArrangeOrder { /* 정렬 순서 */
	LATEST_FIRST = '001' /* 최신순 */,
	POPULAR_FIRST = '002' /* 인기순 */,
}

type LocalRequestParams = {
	serviceKey:string;
	pageNo?:number;
	numOfRows?:number;
	lifeArray?:LifeArray;
	trgterIndvdlArray?:TargetIndividualArray;
	intrsThemaArray?:InterestThemaArray;
	age?:number;
	ctpvNm?:KoreanRegion /*도시*/
	// sggNm /*시군구*/
	srchKeyCode?:SearchKeyCode;
	searchWrd?:string;
	arrgOrd?:ArrangeOrder;
}

/* 응답 */

export { LocalURL }
export { LifeArray, TargetIndividualArray, InterestThemaArray, WelfareInfoDetailCode, SearchKeyCode, ArrangeOrder }
