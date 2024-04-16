import {KoreanRegion} from "./Kr";

const NationalURL = 'http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfarelist' as string;

enum CallType {
	List='L',
	Detail='D',
}
enum SearchKeyCode { /* 검색 분류 */
	Ti='001', /* 제목 */
	Co='002', /* 내용 */
	TC='003', /* 제목+내용 */
}
enum LifeArray { /* 생애주기 */
	INFANT='001' /* 영유아 */,
	CHILD='002' /* 아동 */,
	TEENAGER='003' /* 청소년 */,
	YOUTH='004' /* 청년 */,
	MIDDLE='005' /* 중장년 */,
	OLD='006' /* 노년 */,
	PREGNANT ='007' /* 임신/출산 */,
}
enum CharacteristicTargetArray { /* 대상특성 */
	GENERAL = '001' /* 일반 */,
	DISABLED = '002' /* 장애인 */,
	MILITARY_SERVICE = '003' /* 국가유공자 등 보훈대상 */,
	VICTIM = '004' /* 의사상자 */,
	BAD_CREDIT = '005' /* 신용불량자 */,
	HOMELESS = '006' /* 무주택자 */,
	PREGNANT = '007' /* 임산부 */,
	INFERTILE_COUPLE = '008' /* 난임.불임 부부 */,
	LONELY_ELDERLY = '009' /* 독거노인 */,
	HOMELESS_PERSON = '010' /* 노숙인 */,
	WOMAN = '011' /* 여성 */,
	LOW_INCOME = '012' /* 저소득층 */,
	VULNERABLE_GROUP = '013' /* 취약계층 */,
	UNEMPLOYED = '014' /* 실업자(취업희망자) */,
	LOW_INCOME_WORKER = '015' /* 저소득근로자 */,
	MICRO_BUSINESS_OWNER = '016' /* 영세자영업(창업)자 */,
	FARMER = '017' /* 농어업인 */,
	ELEMENTARY_STUDENT = '018' /* 학생(초등) */,
	MIDDLE_HIGH_STUDENT = '019' /* 학생(중·고등학교) */,
	COLLEGE_STUDENT = '020' /* 학생(대학생 이상) */,
	PRESCHOOLER = '021' /* 미취학 */,
	SINGLE_PARENT_FAMILY = '022' /* 한부모가구 */,
	ORPHAN_FAMILY = '023' /* 소년소녀가장가구 */,
	MULTICULTURAL_FAMILY = '024' /* 다문화가구 */,
	ADOPTIVE_FAMILY = '025' /* 입양가구 */,
	SINGLE_GRANDPARENT_FAMILY = '026' /* 조손가구 */,
	MULTICHILD_FAMILY = '027' /* 다자녀가구 */,
	NEW_RESIDENT_FAMILY = '028' /* 새터민가구 */,
	CHILD_CARE_FAMILY = '029' /* 아동위탁가정 */,
}
enum DisabilityType {
	PHYSICAL_CONVERT = '10' /* 지체(전환대상) */,
	PHYSICAL_UPPER_LIMB_AMPUTATION = '11' /* 지체(상지절단) */,
	PHYSICAL_LOWER_LIMB_AMPUTATION = '12' /* 지체(하지절단) */,
	PHYSICAL_UPPER_LIMB_JOINT = '13' /* 지체(상지관절) */,
	PHYSICAL_LOWER_LIMB_JOINT = '14' /* 지체(하지관절) */,
	PHYSICAL_UPPER_LIMB_FUNCTION = '15' /* 지체(상지기능) */,
	PHYSICAL_LOWER_LIMB_FUNCTION = '16' /* 지체(하지기능) */,
	PHYSICAL_SPINE = '17' /* 지체(척추) */,
	PHYSICAL_DEFORMATION = '18' /* 지체(변형) */,
	VISUAL = '20' /* 시각 */,
	HEARING_CONVERT = '30' /* 청각(전환대상) */,
	HEARING_LOSS = '31' /* 청각(청력) */,
	HEARING_BALANCE_FUNCTION = '32' /* 청각(평형기능) */,
	LANGUAGE = '40' /* 언어 */,
	INTELLECTUAL_DISABILITY = '50' /* 지적장애 */,
	BRAIN_DAMAGE = '60' /* 뇌병변 */,
	AUTISM = '70' /* 자폐성장애 */,
	MENTAL = '80' /* 정신 */,
	KIDNEY = '90' /* 신장 */,
	HEART = 'A0' /* 심장 */,
	RESPIRATORY = 'B0' /* 호흡기 */,
	LIVER = 'C0' /* 간 */,
	FACE = 'D0' /* 안면 */,
	BLADDER = 'E0' /* 장루.요루 */,
	EPILEPSY = 'F0' /* 뇌전증 */,
	OTHER = 'Z0' /* 기타 */,
}
enum DisabilitySeverity { /* 장애정도 */
	NOT_APPLICABLE = '00' /* 장애 미해당 */,
	SEVERE = '10' /* 심한 장애 */,
	MILD = '20' /* 심하지 않은 장애 */,
	DECISION_DEFERRED = '98' /* 결정보류 */,
	UNABLE_TO_CONFIRM = '99' /* 확인불가 */,
}
enum TargetIndividualArray{ /* 가구상황 */
	MULTI_CULTURAL='010' /* 다문화 / 탈북민 */,
	MULTI_CHILD='020' /* 다자녀 */,
	WAR_HERO='030' /* 보훈 대상자 */,
	DISABLED='040' /* 장애인 */,
	LOW_INCOME='050' /* 저소득*/,
	SINGLE_PARENT='060' /* 한부모,조손 */
}
enum DesireArray { /* 사업목적 */
	EMPLOYMENT = '100' /* 일자리 */,
	HOUSING = '110' /* 주거 */,
	DAILY_LIFE = '120' /* 일상생활 */,
	PHYSICAL_HEALTH = '130' /* 신체건강 및 보건의료 */,
	MENTAL_HEALTH = '140' /* 정신건강 및 심리정서 */,
	PROTECTION_AND_CARE = '150' /* 보호 및 돌봄·요양 */,
	EDUCATION = '160' /* 보육 및 교육 */,
	CULTURE_AND_LEISURE = '170' /* 문화 및 여가 */,
	SAFETY_AND_RIGHTS = '180' /* 안전 및 권익보장 */,
}
enum ServiceCode { /* 서비스 구분 코드*/
	INQUIRY = '010' /* 문의 */,
	WEBSITE = '020' /* 사이트 */,
	LEGAL_BASIS = '030' /* 근거법령 */,
	FORM_DATA = '040' /* 서식/자료 */,
	RELATED_FAQ = '050' /* 관련FAQ */,
	INFOGRAPHIC = '060' /* 인포그래픽 */,
	WELFARE_DELIVERY_SYSTEM = '070' /* 복지사업전달체계 */,
}

/* 요청 */
type NationalRequestParams = {
	serviceKey?:string;
	callTp:CallType;
	pageNo:number;
	numOfRows:number;
	srchKeyCode:SearchKeyCode;

	searchWrd?:string;
	lifeArray?:LifeArray;
	charTrgterArray?:CharacteristicTargetArray;
	obstKiArray?:DisabilityType;
	obstAbtArray?:DisabilitySeverity
	trgterIndvdlArray?:TargetIndividualArray;
	desireArray?:DesireArray;
}
/* 응답 */
type NationalResponseParams = {
	numOfRows:number;
	pageNo:number;
	totalCount:number;
	resultCode:number;
	resultMessage:string;
	servList:serviceList[];
}
type serviceList = {
	servId:string;
	servNm:string;
	jurMnofNm:string;
	jurOrgNm:string;
	inqNum:number;
	servDgst:string;
	servDtlLink:string;
	svcfrstRegTs:Date;
	trgterIndvdlArray?:string|TargetIndividualArray[];
}

export { NationalURL}
export { CallType,SearchKeyCode,LifeArray,CharacteristicTargetArray,DisabilityType,DisabilitySeverity,TargetIndividualArray,DesireArray,ServiceCode }
export type {NationalRequestParams, NationalResponseParams, serviceList}