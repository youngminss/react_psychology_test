import React, {useState,useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";

import "../Result.css";

function JobTable(props) {

    const [educationInfo, setEducationInfo] = useState([]);
    const [professionInfo, setProfessionInfo] = useState([]);
    
    useEffect(() => {
        async function fetch() {
            try {

                console.log("넘어온 결과 :",props.No[0], props.No[1]);
                const response1 = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${props.No[0]}&no2=${props.No[1]}`);
            
                console.log("API1 :", response1.data);
                localStorage.educationInfo = JSON.stringify(response1.data);
                setEducationInfo(JSON.parse(localStorage.educationInfo));
                console.log("SET1 :", educationInfo);
        
                const response2 = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${props.No[0]}&no2=${props.No[1]}`);
                           
                console.log("API2 :", response2.data);
                localStorage.professionInfo = JSON.stringify(response2.data);
                setProfessionInfo(JSON.parse(localStorage.professionInfo));
                
                console.log("SET2 :", professionInfo);

            } catch (e) {
                console.log("테이블쪽 통신에러");
                console.log(e);
            }
        }
        fetch();
    },[]);
    
    return(
        <div className="job-table">
            <h3>가치관과 관련이 높은 직업</h3>
            <div className="job-table-title">
                <h4>종사자 평균 학력별</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">분야</th>
                        <th scope="col">직업</th>
                    </tr>
                    <tr>
                        <td>중졸</td>
                        <td>
                            {
                                educationInfo.filter((datas) => datas[2] === 1).map((data,index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return(
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>고졸</td>
                        <td>
                            {
                                educationInfo.filter((datas) => datas[2] === 2).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>전문대졸</td>
                        <td>
                            {
                                educationInfo.filter((datas) => datas[2] === 3).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>대졸</td>
                        <td>
                            {
                                educationInfo.filter((datas) => datas[2] === 4).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>대학원졸</td>
                        <td>
                            {
                                educationInfo.filter((datas) => datas[2] === 5).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                </thead>
            </table>

            <div className="job-table-title">
                <h4>종사자 평균 전공별</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">분야</th>
                        <th scope="col">직업</th>
                    </tr>
                    <tr>
                        <td>인문</td>
                        <td>
                            {
                                professionInfo.filter((datas) => datas[2] === 1).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>사회</td>
                        <td>
                            {
                                professionInfo.filter((datas) => datas[2] === 2).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>교육</td>
                        <td>
                            {
                                professionInfo.filter((datas) => datas[2] === 3).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>공학</td>
                        <td>
                            {
                                professionInfo.filter((datas) => datas[2] === 4).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>자연</td>
                        <td>
                            {
                                professionInfo.filter((datas) => datas[2] === 5).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>의학</td>
                        <td>
                            {
                                professionInfo.filter((datas) => datas[2] === 6).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>예체능</td>
                        <td>
                            {
                                professionInfo.filter((datas) => datas[2] === 7).map((data, index) => {
                                    const url = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${data[0]}`;
                                    return (
                                        <a href={url} key={index} className="result-aTag" value={data[2]} target="_blank" rel="noreferrer">{data[1]}</a>
                                    )
                                })
                            }
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    );
}


function Result() {
    
    const [userName, setUserName] = useState("");
    const [userGender,setUserGender] = useState("");
    const [testDay, setTestDay] = useState("");
    const [score,setScore] = useState({score:[]});
    const [scoreStr, setScoreStr] = useState("");
    const [resNo, setResNo] = useState({NoArr:[]});
    const location = useLocation();
    const seq = location.state.seq;
    const url = `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${seq}`;
    
    const valueList = ["", "능력발휘", "자율성", "보수", "안정성", "사회적 인정", "사회봉사", "자기계발", "창의성"];
    
    function findResNo(score_arr) {
        console.log("arr :", score_arr);
        var dup_arr = score_arr.slice();

        var first = Math.max.apply(null, dup_arr);
        var firstIndex = dup_arr.indexOf(first);
        dup_arr[firstIndex] = 0;

        var second = Math.max.apply(null, dup_arr);
        var secondIndex = dup_arr.indexOf(second);

        return [firstIndex + 1, secondIndex + 1];
    }

    useEffect(() => {
        
        async function fetch() {
            try { 
                const response = await axios.get(url);
                setUserName(response.data.user.name);
                if (response.data.inspct.sexdstn === 100323)
                    setUserGender("남자");
                else
                    setUserGender("여자");
                setTestDay(response.data.inspct.beginDtm.slice(0, 10));

                console.log("이름 :", userName);
                console.log("성별 :", userGender);
                console.log("날짜 :", testDay);


                console.log("API score str :", response.data.result.wonScore);
                setScoreStr(response.data.result.wonScore);
                console.log("state score str", scoreStr);

                var data_list = [];

                for (var i = 0; i < 8; i++)
                    data_list.push(Number(scoreStr[2 + (4 * i)]));

                console.log("dataList :", data_list);
                setScore({ score: data_list });
                console.log("State score", score.score);

                const res = findResNo(score.score);
                setResNo({ NoArr: res });
                console.log("resNO :", resNo.NoArr);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    },[scoreStr]);
    
    const data = {
        labels: ["능력발휘", "자율성", "보수", "안정성", "사회적 인정", "사회봉사", "자기계발", "창의성"],
        datasets: [{
            label: "직업가치관결과",
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth : 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: score.score
        }]
    };
    const option = {
        scales: {
            yAxes : [{
                ticks : {
                    min : 0,
                    max : 10,
                    stepSize: 1
                }
            }]
        },
        maintainAspectRatio : true
    }

    

    
    
    return(
        <>
            <div className="result-title-box">
                <h2 className="result-title">직업가치관검사 결과표</h2>
            </div>
            <div className="result-description-box">
                직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
            </div>

            <table className="result-table">
                <thead>
                    <tr>
                        <th scope="col">이름</th>
                        <th scope="col">성별</th>
                        <th scope="col">검사일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{userName}</td>
                        <td>{userGender}</td>
                        <td>{testDay}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />

            <div className="my-value">
                <h2 className="value-comment-title">직업가치관 결과</h2>
                <p className="value-comment">
                    직업생활과 관련하여 {userName}님은 {valueList[resNo.NoArr[0]]}(와)과 {valueList[resNo.NoArr[1]]}(을)를 가장 중요하게 생각합니다. 
                    <br />
                    반면에 자기계발, 사회봉사은 상대적으로 덜 중요하게 생각합니다.
                </p>
            </div>

            <Bar
                data={data}
                width={100}
                height={50}
                options={option}
            />
            <br />
            <br />
            
            <JobTable No={resNo.NoArr} />

            <br />
            <br />
            
            <div className="text-center">
                <Link to="/"><button className="btn btn-outline-primary">다시 검사하기</button></Link>
            </div>
        </>
    );
}

export default Result;