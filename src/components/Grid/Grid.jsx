import { memo, useCallback, useState } from "react"
import Card from "../card/card.jsx"
import './Grid.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function isWinner(board, symbol){
    if(board[0] == board[1] && board[1] == board[2] && board[2] == symbol) return symbol
    if(board[3] == board[4] && board[4] == board[5] && board[5] == symbol) return symbol
    if(board[6] == board[7] && board[7] == board[8] && board[8] == symbol) return symbol

    if(board[0] == board[3] && board[3] == board[6] && board[6] == symbol) return symbol
    if(board[1] == board[4] && board[4] == board[7] && board[7] == symbol) return symbol
    if(board[2] == board[5] && board[5] == board[8] && board[8] == symbol) return symbol

    if(board[0] == board[4] && board[4] == board[8] && board[8] == symbol) return symbol
    if(board[2] == board[4] && board[4] == board[6] && board[6] == symbol) return symbol

    return null
}   

function Grid({numberOfCards}) {

        function getVal(){
            if(Math.random()<0.5) return false
            else return true
            }
        
        const [turn, setTurn] = useState(getVal()) // true ==> 'O' false ==> 'X'
        const [board, setBoard] = useState(Array(numberOfCards).fill(""))
        const [winner, setWinner] = useState(null)

        const play = useCallback( function playCallBack(index){
            console.log("Move Played", index);

            if(turn === true){
                board[index] = 'O'
            }else if(turn === false){
                board[index] = 'X'
            }

            const win = isWinner(board, turn?'O':'X')
            console.log(win);
            if(win){
                setWinner(win);
                toast.success(`Congratulations!! ${win} win the game `)
            }


            setBoard([...board])
            setTurn(!turn)
        },[turn])

        function reset(){
            setBoard(Array(numberOfCards).fill(""))
            setWinner(null)
            setTurn(getVal())
        }

        return (
            <div className="grid-wrapper">
                {winner && (
                    <>
                        <h1 className="turn-highlight">Winner is {winner} </h1> 
                        <button className="reset" onClick={reset}>Reset Game</button>
                        <ToastContainer position="top-center"/>
                    </>
                )}
                <h1 className="turn-highlight">Current Turn: {(turn)?'O':'X'}</h1>
                <div className="grid">
                    {board.map((value, idx)=>{
                        return <Card gameEnd={winner ? true: false} index={idx} onPlay={play} player={value} key={idx}/>
                    })}
                </div>
            </div>
    )
}
export default memo( Grid)