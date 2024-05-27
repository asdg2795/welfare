import React, {useEffect, useRef, useState} from 'react';
import './ServFunc.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CallType, NationalRequestParams, LifeArray,TargetIndividualArray,NationalURL, SearchKeyCode, serviceList} from "./Types/NationalGo";
import axios from "axios";


function ServFunc() {
    const [selectedItem1, setSelectedItem1] = useState<number | null >(null);
    const [selectedValue1, setSelectedValue1] = useState<LifeArray| undefined>(undefined);
    const [selectedItem2, setSelectedItem2] = useState<number | null>(null);
    const [selectedValue2, setSelectedValue2] = useState<TargetIndividualArray| undefined>(undefined);

    useEffect(() => {
        const changeSelValue1 = (selectedItem1:number) => {
            switch (selectedItem1) {
                case 0:
                    setSelectedValue1(LifeArray.INFANT)
                    break;
                case 1:
                    setSelectedValue1(LifeArray.CHILD)
                    break;
                case 2:
                    setSelectedValue1(LifeArray.TEENAGER)
                    break;
                case 3:
                    setSelectedValue1(LifeArray.YOUTH)
                    break;
                case 4:
                    setSelectedValue1(LifeArray.MIDDLE)
                    break;
                case 5:
                    setSelectedValue1(LifeArray.OLD)
                    break;
                case 6:
                    setSelectedValue1(LifeArray.PREGNANT)
                    break;
                default:
                    throw new Error(`Unexpected selecetedItem1 : ${selectedItem1}`)
            }
        };
        if (selectedItem1 !== null){
            changeSelValue1(selectedItem1);
        }
    }, [selectedItem1]);

    useEffect(() => {
        const changeSelValue2 = (selectedItem2:number)=> {
            switch (selectedItem2) {
                case 0:
                    setSelectedValue2(TargetIndividualArray.MULTI_CULTURAL)
                    break;
                case 1:
                    setSelectedValue2(TargetIndividualArray.MULTI_CHILD)
                    break;
                case 2:
                    setSelectedValue2(TargetIndividualArray.WAR_HERO)
                    break;
                case 3:
                    setSelectedValue2(TargetIndividualArray.DISABLED)
                    break;
                case 4:
                    setSelectedValue2(TargetIndividualArray.LOW_INCOME)
                    break;
                case 5:
                    setSelectedValue2(TargetIndividualArray.SINGLE_PARENT)
                    break;
                default:
                        throw new Error(`Unexpected selectedItem2 : ${selectedItem2}`)
            }
        };
        if(selectedItem2 !== null) {
            changeSelValue2(selectedItem2);
        }
    }, [selectedItem2]);

    useEffect(() => {
        if (selectedValue1 !== undefined && selectedValue2 !== undefined) {
            setRequest(prevState => ({
                ...prevState,
                lifeArray: selectedValue1,
                trgterIndvdlArray: selectedValue2
            }));
        }
    },[selectedValue1, selectedValue2]);

       // API 요청에 필요한 매개변수를 담은 객체 초기화
    const requestParams:NationalRequestParams = {
        // serviceKey:process.env.REACT_APP_ENCODED_APIKEY as string,
        callTp:CallType.Detail,
        pageNo: 1,
        numOfRows: 10,
        srchKeyCode: SearchKeyCode.TC,
        lifeArray: LifeArray.DEFAULT_VALUE,
        trgterIndvdlArray: TargetIndividualArray.DEFAULT_VALUE
    };

    // 요청 파라미터를 쿼리 문자열로 변환
    const reqQueryString= "?" + Object.entries(requestParams)
        .map(([key, value])=> key&&value?(key+"="+value):'').join("&")

    // Axios를 사용하여 API에 GET 요청을 보내는 함수
    function axiosAPIAccess(){
        // console.log(reqQueryString);
        axios({
            // 요청 URL 생성 : NationalURL + reqQueryString + serviceKey
            url:NationalURL+reqQueryString+"&serviceKey="+process.env.REACT_APP_ENCODED_APIKEY as string,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method:"GET",
            // data:requestParams
        }).then((res) => {
            // 요청 성공 시 응답 데이터 로그 출력
            console.log(res);
            console.log(res.config.data);
            console.log(res.data);
        }).catch((err) => {
            // 요청 실패 시 에러 로그 출력
            console.log(err);
        })
    }

    // 컴포넌트 내에서 상태를 관리하고 효과를 발생시키는 부분
    const [request, setRequest]
        = useState(requestParams as NationalRequestParams);
    const [response, setResponse]
        = useState([] as serviceList[])

    useEffect(() => {
        // 컴포넌트가 렌더링 될 때와 request 상태가 변경될 때 마다 실행
        axios.get(`${process.env.REACT_APP_REST_API as string}/test`,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            params:request  // 요청 파라미터 설정
        }).then((res)=> {
            // 요청 성공 시 응답 데이터를 로그에 출력하고 response 상태 업데이트
            console.log(res.data);
            setResponse([...response, ...(res.data.wantedList.servList as serviceList[])]);
        }).catch((err)=>{
            // 요청 실패 시 에러 로그 출력
            console.log(err);
        })
    }, [request]); // request 상태가 변경될 때 마다 효과 발생

    const [inputText, setInputText] = useState('');
    const [selectedMiddleLaneIndex, setSelectedMiddleLaneIndex] = useState<number | null>(null);
    const [clicked, setClicked] = useState(false);

    // 클릭된 middle-lane-item의 인덱스를 설정하는 함수
    const handleMiddleLaneItemClick = (index: number) => {
        setSelectedMiddleLaneIndex(index); // 클릭된 middle-lane-item의 인덱스 설정
    };

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value);
    }

    function handleSearch() {
        console.log("검색어:", inputText);
    }

    const hideDetailContent = () => {
        setSelectedMiddleLaneIndex(null);
    };

    const [prevSelectionItem1, setPrevSelectionItem1] = useState<number|null>(null);
    const [prevSelectionItem2, setPrevSelectionItem2] = useState<number|null>(null);


    // 처음 선택한 값과 변경되기 직전 값을 저장
    useEffect(() => {
        // 선택이 변경되기 직전 값을 저장
        if (clicked && selectedItem1 !== null && prevSelectionItem1 === null) {
            setPrevSelectionItem1(selectedItem1);
        }
    }, [selectedItem1, prevSelectionItem1]);

    useEffect(() => {
        // 선택이 변경되기 직전 값을 저장
        if (clicked && selectedItem2 !== null && prevSelectionItem2 === null) {
            setPrevSelectionItem2(selectedItem2);
        }
    }, [selectedItem2, prevSelectionItem2]);

    const axiosAndSearch = () => {
        if (selectedItem1 != null && selectedItem2 != null) {
            setClicked(true);
            setResponse([]);
            axiosAPIAccess();
            setPrevSelectionItem1(selectedItem1);
            setPrevSelectionItem2(selectedItem2);
            console.log("SI : ", selectedItem1);
            console.log("PS : ", prevSelectionItem1);
        } else {
            if (selectedItem1 == null && selectedItem2 != null) {
                alert('생애주기를 선택해주세요!')
                setClicked(false);
            } else if (selectedItem1 != null && selectedItem2 == null) {
                alert('가구유형을 선택해주세요!')
                setClicked(false);
            } else {
                alert('조건을 선택해주세요!')
                setClicked(false);
            }
        }
    };

    return (
        <div className="main">
            <div className="logo">
                <Link to="/" className="fun-Link">
                    <h1>LOGO</h1>
                </Link>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="전체 검색 | 검색어를 입력하세요."
                />
                <button onClick={handleSearch}>🔍</button>
            </div>

            <div className="middle-box">
                <div className="section box-section1">생애주기</div>
                <div className="section box-section2">가구유형</div>
            </div>
            <div className="main-box">
                <div className="section main-section1">
                    <ul>
                        {[
                            {text: "영유아"},
                            {text: "아동"},
                            {text: "청소년"},
                            {text: "청년"},
                            {text: "중장년"},
                            {text: "노년"},
                            {text: "임신·출산"}
                        ].map((item, index) => (
                            <li
                                key={index}
                                className={selectedItem1 === index ? 'selected' : ''}
                                onClick={() => {
                                    setSelectedItem1(index);
                                }}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="section main-section2">
                    <ul>
                        {[
                            {text: "다문화·탈북민"},
                            {text: "장애인"},
                            {text: "다자녀"},
                            {text: "보훈대상자"},
                            {text: "저소득"},
                            {text: "한부모·조손"},
                        ].map((item, index) => (
                            <li
                                key={index}
                                className={selectedItem2 === index ? 'selected' : ''}
                                onClick={() => {
                                    setSelectedItem2(index);
                                }}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="search-btn">
                <button className="btn btn-outline-primary" type="button" onClick={axiosAndSearch}>SEARCH</button>
            </div>

            <div className="middle-lane">
                {clicked && selectedItem1 != null && selectedItem2 != null ? (
                <h6>총 {response.length}건의 복지서비스가 있습니다.</h6>
                ):null}
                <hr/>
                {clicked && selectedItem1 != null && selectedItem2 != null? (
                response.map((v,i)=> (
                    <div key={v.servId + i} className="middle-lane-item">
                        {selectedMiddleLaneIndex === i ? (
                            <div className="detail-content">
                                <h4 className="detail-name">{v.jurMnofNm} {v.jurOrgNm}</h4>
                                <p className="detail-description">
                                    <p>대상 {v.trgterIndvdlArray}</p>
                                    <p>내용 {v.servDgst}</p>
                                    <p>링크 <a href={v.servDtlLink}>바로가기</a></p>
                                    <p>지원수단 {v.servNm}</p>
                                    <p>담당부처 {v.jurMnofNm} {v.jurOrgNm}</p>
                                </p>
                                <h6 className="main-btn" onClick={hideDetailContent}>접기</h6>
                            </div>
                        ) : (
                            <div className="search-content">
                                <h4 className="main-name">{v.jurMnofNm} {v.jurOrgNm}</h4>
                                <h6 className="main-content">{v.servDgst}</h6>
                                <h6 className="main-btn" onClick={() => handleMiddleLaneItemClick(i)}>상세보기</h6>
                            </div>
                        )}
                    </div>
                ))
                ) : null}
            </div>

            <div className="footer"></div>
        </div>
    )}
export default ServFunc;