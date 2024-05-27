import React, {useEffect, useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import banner from './img/banner.png';
import content1 from './img/001.png';
import content2 from './img/002.png';


function App() {

    const [inputText, setInputText] = useState('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value);
    }

    function handleSearch() {
        console.log("검색어:", inputText);
    }

        return (
            <div className="main">
                <div className="header">
                    <div className="header-section hs1">
                        <Link to="/" className="fun-Link">
                            <h1>LOGO</h1>
                        </Link>
                    </div>
                    <div className="header-section hs2"></div>

                </div>
                <div className="top-section">
                    <div className="section section1">
                        <Link to="/ServFunc" className="fun-Link">
                            <img src={content1} alt="복지서비스"/>
                        </Link>
                        <h2>복지 서비스를 <br/>소개합니다!</h2>
                    </div>
                    <div className="section section2">
                        <Link to="" className="fun-Link">
                            <img src={content2} alt="복지시설"/>
                        </Link>
                        <h2>복지 시설을 <br/>소개합니다!</h2>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-bar">
                        <input
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="전체 검색 | 검색어를 입력하세요."
                        />
                        <button onClick={handleSearch}>🔍</button>
                    </div>
                </div>

                <div className="banner-section">
                    <div className="banner">
                        <img src={banner} alt="배너"/>
                        <div className="left-arrow"></div>
                        <div className="right-arrow"></div>
                    </div>
                </div>

                <div className="footer"></div>
            </div>
        );
    }
export default App;

