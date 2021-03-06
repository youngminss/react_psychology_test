import React,{useState, useEffect} from "react";
import axios from "axios";
import $ from 'jquery';
import { withRouter } from "react-router-dom";

import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    item : {
        textAlign : "center",
    }
}));

function Test(props) {

    const [data,setData] = useState({data: []});
    const [num,setNum] = useState(0);
    const [buttonText, setButtonText] = useState("다음");
    const [counter,setCounter] = useState(0);
    const [progressCount,setProgressCount] = useState(0);

    const classes = useStyles();

    async function fetch(){
        const response = await axios.get("https://www.career.go.kr/inspct/openapi/test/questions?apikey=8ae87adbbfc34f50eb84444700264097&q=6");
        const data = response.data.RESULT;
        setData({data : data});
    }

    useEffect(() => {
        fetch();  
    },[])

    function countChecked() {
        var count = 0;
        $('.test-radio').each(function(){
            if($(this).is(':checked')){
                count += 1;
            }
        });
        return count;
    }

    function pageCountChecked(num) {
        var count = 0;
        $(`.group${num}`).each(function(){
            for (var i = 0; i < this.querySelectorAll('.test-radio').length; i++){
                if (this.querySelectorAll('.test-radio')[i].checked)
                    count += 1;           
            }
        });
        if(num === 5 && count === 3)
            count = 5;
        return count;
    }

    const group = data.data;
    function testListMaker(group) {
        var testList = [];
        
        for(var i=0; i<group.length; i++){
            testList.push(
                    <div key={i + 1} className={"group" + parseInt(i / 5)}   > 
                        <p>{group[i].qitemNo}. {group[i].question}</p>
                        <label className="form-check-label"><input type="radio" className="test-radio" name={group[i].qitemNo} value={group[i].answerScore01} onChange={(event) => {
                            setCounter(counter + 1);
                            const cur_count = countChecked();
                            setProgressCount(cur_count);
                        }} />{group[i].answer01}</label>
                    <label className="form-check-label"><input type="radio" className="test-radio" name={group[i].qitemNo} value={group[i].answerScore02} onChange={(event) => {
                            setCounter(counter + 1);
                            const cur_count = countChecked();
                            setProgressCount(cur_count);
                        }} />{group[i].answer02}</label>
                    </div>
            );
        }
        return testList;
    }

    const testList = testListMaker(group)
    
    function nextTestList(num) {    
        $(`.group${num+1}`).fadeIn('linear');
        $(`.group${num}`).hide();
    }
    function prevTestList(num) {
        $(`.group${num-1}`).fadeIn('linear');
        $(`.group${num}`).hide();
    }

    async function handleSubmit(){
        const userName = document.querySelector("#standard-textarea").value;
        let gender = null;
        
        if (document.querySelector("#male").checked)
            gender = document.querySelector("#male").value;
        else if (document.querySelector("#female").checked)
            gender = document.querySelector("#female").value;
        
        var answer = $(".test-form").serialize().replace(/&/gi,' B');
        answer = "B" + answer;

        let data = {
            apikey: "8ae87adbbfc34f50eb84444700264097",
            qestrnSeq : "6",
            trgetSe: "100208",
            name : userName,
            gender: gender,
            school : "",
            grade : "",
            email : "",
            startDtm : String(new Date().getTime()),
            answers : answer
        }

        const url = "https://www.career.go.kr/inspct/openapi/test/report";
        const post_response = await axios.post(url, JSON.stringify(data), {
            headers: { "Content-Type": `application/json` }
        }).catch(error => {
            console.log(error);
        });
        
        const seq = post_response.data.RESULT.url.split('=')[1];
        localStorage.setItem("seq", seq);

        props.history.push({
            pathname : "/Completed",
        });
    }

    return (
        <div className="test-container" style={props.isLoggined ? { display: "block" } : { display: "none" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.item}>
                    <Typography id="test-title" variant="h4" gutterBottom>
                        검사 진행
                     </Typography>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <LinearProgress animated variant="determinate" value={Math.round(progressCount / data.data.length * 100)} valueBuffer={100} />
                        </Box>
                        <Box minWidth={35}>
                            <Typography variant="h6" color="textSecondary">🏃‍♂️..{Math.round(progressCount / data.data.length * 100)}%</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <form className="test-form">
                        {testList}
                    </form>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <div className="test-button">
                        <button style={{ float: 'left' }} className="btn btn-outline-primary btn-lg" name="prev-btn" onClick={() => {
                            if (num === 0)
                                props.changePage();
                            else {
                                setCounter(5);
                                if (num === 5)
                                    setButtonText("다음");
                                setNum(num - 1);
                                prevTestList(num);
                            }
                        }}>이전</button>
                        <button style={{ float: 'right' }} disabled={pageCountChecked(num) < 5 ? true : false} className="btn btn-outline-primary btn-lg" name="next-btn" onClick={(event) => {
                            if (event.target.value === "제출")
                                handleSubmit();
                            setNum(num + 1);
                            const cur_count = pageCountChecked(num + 1);
                            setCounter(cur_count);
                            if (num === 4) {
                                setButtonText("제출");
                                setCounter(2);
                            }
                            nextTestList(num);
                        }} value={buttonText} >{buttonText}</button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default withRouter(Test);