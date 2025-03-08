import { useState } from "react";
import "./App.css";
import { Navbar } from "./Component/Navbar";
import { GiHumanTarget } from "react-icons/gi";
import axios from "axios";

function App() {
  const [firstPlayerWords, setFirstPlayerWords] = useState([]);
  const [secondPlayerWords, setSecondPlayerWords] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);

  // player 1 function
  const handleSubmitPlayer1 = (e) => {
    e.preventDefault();
    const form = e.target;
    const word = form.word.value;
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        console.log(res.data);
        setFirstPlayerWords([word, ...firstPlayerWords]);
        form.reset();
        setPlayerTurn(2);
      })
      .catch((err) => {
        console.log(err.status === 404);
        alert("Invalid Word");
      });
  };
  // player 2 function
  const handleSubmitPlayer2 = (e) => {
    e.preventDefault();
    const form = e.target;
    const word = form.word.value;

    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        console.log(res.data);
        setSecondPlayerWords([word, ...secondPlayerWords]);
        form.reset();
        setPlayerTurn(1);
      })
      .catch((err) => {
        console.log(err.status === 404);
        alert("Invalid Word");
      });
  };
  return (
    <div>
      <Navbar />

      {/* multiPlayer section */}
      <div className="flex justify-center items-center">
        {/* player 1 */}
        <div className={`${playerTurn === 1 && "text-green-700"}`}>
          {/* player profile */}
          <div className="flex gap-4 items-center flex-col justify-center">
            <GiHumanTarget className="text-6xl border-2 p-2" />
            <h4 className="text-lg font-medium">Player 1</h4>
          </div>
          {/* word section */}
          <div className="border-2 min-h-[300px] w-full">
            {/* entering word */}
            <div className="p-2">
              <form onSubmit={handleSubmitPlayer1} className="space-x-2">
                <input name="word" className="border-2 py-2" type="text" />
                <button type="submit" className="border p-2 cursor-pointer">
                  Enter word
                </button>
              </form>
            </div>
            {/* show words */}
            <div className="space-y-2">
              {firstPlayerWords.map((item) => (
                <div className="border px-2 text-lg">{item}</div>
              ))}
            </div>
          </div>
        </div>
        {/* player 2 */}
        <div className={`${playerTurn === 2 && "text-green-700"}`}>
          {/* player profile */}
          <div className="flex gap-4 items-center flex-col justify-center">
            <GiHumanTarget className="text-6xl border-2 p-2" />
            <h4 className="text-lg font-medium">Player 2</h4>
          </div>
          {/* word section */}
          <div className="border-2 min-h-[300px] w-full">
            {/* entering word */}
            <div className="p-2">
              <form onSubmit={handleSubmitPlayer2} className="space-x-2">
                <input name="word" className="border-2 py-2" type="text" />
                <button type="submit" className="border p-2 cursor-pointer">
                  Enter word
                </button>
              </form>
            </div>
            {/* show words */}
            <div className="space-y-2">
              {secondPlayerWords.map((item) => (
                <div className="border px-2 text-lg">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
