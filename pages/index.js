import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
console.log("192.168.137.116:3000");
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const LOADMSGS = ["Loading...", "Asking gpt3...", "Writing...", "Loading...", "Asking gpt3...", "Writing...", "Thinking...", "Pondering...", "Brainstorming...", "Googling...", "Researching...", "Executing gpt3 protocols...", "Consulting magic orb...", "Something went... Right!", "This may take a while, come back in 15 seconds."];
    const randLoadMsg = LOADMSGS[Math.ceil((Math.random()*LOADMSGS.length))]
    setResult(randLoadMsg);
    console.log(result);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>essAI-writer</title>
        <link rel="icon" href="/Brainstorm.png" />
      </Head>

      <main className={styles.main}>
        <img src="/cog.png" className={styles.icon} />
        <h3>essAI-writer</h3>
        <p>"Write a long, accurate and detailed essay on the topic of ______ "</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder='essay topic'
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate essay" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
