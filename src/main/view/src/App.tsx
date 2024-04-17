import React, {useEffect, useState} from 'react';
import './App.css';
import {CallType, NationalRequestParams, NationalResponseParams, serviceList, NationalURL, SearchKeyCode} from "./Types/NationalGo";
import axios from "axios";

function App() {
    const requestParams:NationalRequestParams = {
        // serviceKey:process.env.REACT_APP_ENCODED_APIKEY as string,
        callTp:CallType.List,
        pageNo: 1,
        numOfRows: 10,
        srchKeyCode: SearchKeyCode.Ti,
    }
    const reqQueryString="?" + Object.entries(requestParams)
        .map(([key, value])=> key&&value?(key+"="+value):'').join("&")
    function axiosAPIAccess(){
        // console.log(reqQueryString);
        axios({
            url:NationalURL+reqQueryString+"&serviceKey="+process.env.REACT_APP_ENCODED_APIKEY as string,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method:"GET",
            // data:requestParams
        }).then((res) => {
            console.log(res);
            console.log(res.config.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const [request, setRequest]
        = useState(requestParams as NationalRequestParams);
    const [response, setResponse]
        = useState([] as serviceList[])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_REST_API as string}/test`,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            params:request
        }).then((res)=>{
            console.log(res.data);
            setResponse([...response, ...(res.data.wantedList.servList as serviceList[])]);
        }).catch((err)=>{
            console.log(err);
        })
    }, [request]);

    return (
        <div className={'App'}>
            <h2>Test</h2>
            <button onClick={axiosAPIAccess}>AXIOS</button>
            <section className={'test'}>
                <div>
                    <span>서비스명</span>
                    <span>소관부처명</span>
                    <span>소관조직명</span>
                    <span>요약</span>
                    <span>상세링크</span>
                    <span>등록일</span>
                </div>
            {
                response.map((v,i)=>{
                    return(
                        <div key={v.servId + i}>
                            {/*<span>{v.servId}</span>*/}
                            <span>{v.servNm}</span>
                            <span>{v.jurMnofNm}</span>
                            <span>{v.jurOrgNm}</span>
                            {/*<span>{v.inqNum}</span>*/}
                            <span>{v.servDgst}</span>
                            <a href={v.servDtlLink}>바로가기</a>
                            <span>{v.svcfrstRegTs.toString()}</span>
                        </div>
                    )
                })
            }
            </section>
            <button onClick={()=>{
                /*request.pageNo = request.pageNo+1;
                setRequest({...request})*/
                setRequest((prevState)=>{
                    return{
                        ...prevState,
                        pageNo:prevState.pageNo+1
                    }
                });
            }}>더보기{request.pageNo}</button>
        </div>
    )
}

export default App;
