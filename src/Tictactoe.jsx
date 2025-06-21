import { useState, useRef } from "react";
import circle from './assets/circle.png';
import cross from './assets/cross.png';
import './tictactoe.css'

let data = ["", "", "", "", "", "", "", "", ""];

function TicTacToe() {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [gameover,setgameover]=useState(false)
    let [buttontext,setbuttontext]=useState("reset")
    let title = useRef(null);
    let box0 = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box_array = [box0, box1, box2, box3, box4, box5, box6, box7, box8];

    const handleToggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src="${cross}" style="width:40px; height:40px"/>`;
            data[num] = "x";
        } else if(count%2!=0){
            e.target.innerHTML = `<img src="${circle}" style="width:40px; height:40px"/>`;
            data[num] = "o";
        }
        setCount(count + 1);
        check();
    };
    const reset=()=>{
        setLock(false)
        data=["", "", "", "", "", "", "", "", ""];
        title.current.innerHTML=""
        setgameover(false)
        box_array.map((e)=>{
            e.current.innerHTML=""
        })
        setbuttontext("reset")
    }
    const check = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            win(data[2]);
        } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            win(data[5]);
        } else if (data[6] === data[7] && data[7] === data[8] && data[7] !== "") {
            win(data[7]);
        } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            win(data[6]);
        } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            win(data[7]);
        } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            win(data[8]);
        } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            win(data[8]);
        } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            win(data[6]);
        }
        else if(data.filter((d)=>d===d[0].length===0)){
            setgameover(true)
            
            // title.current.innerHTML="Game Over"
        }
    };

    const win = (winner) => {
        setLock(true);
        setbuttontext("restart")
        if (winner === "x") {
            title.current.innerHTML = `<img style="width:40px; height:40px" src="${cross}" />`;
        } else {
            title.current.innerHTML = `<img style="width:40px; height:40px" src="${circle}" />`;
        }
    };

    return (
        <div className="container">
            <div>
                
                {lock && <h2 className="winner">Winner is </h2>}
            {gameover &&<h1 className="gameover">Game Over</h1>}
           <h2 ref={title}></h2>
            </div>
            <div className="board">
                <div>
                    <div className="box" ref={box0} onClick={(e) => handleToggle(e, 0)}></div>
                    <div className="box" ref={box1} onClick={(e) => handleToggle(e, 1)}></div>
                    <div className="box" ref={box2} onClick={(e) => handleToggle(e, 2)}></div>
                </div>
                <div>
                    <div className="box" ref={box3} onClick={(e) => handleToggle(e, 3)}></div>
                    <div className="box" ref={box4} onClick={(e) => handleToggle(e, 4)}></div>
                    <div className="box" ref={box5} onClick={(e) => handleToggle(e, 5)}></div>
                </div>
                <div>
                    <div className="box" ref={box6} onClick={(e) => handleToggle(e, 6)}></div>
                    <div className="box" ref={box7} onClick={(e) => handleToggle(e, 7)}></div>
                    <div className="box" ref={box8} onClick={(e) => handleToggle(e, 8)}></div>
                </div>
            </div>
            <button onClick={reset}>{buttontext}</button>
        </div>
    );
}

export default TicTacToe;
