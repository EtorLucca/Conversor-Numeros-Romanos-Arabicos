import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [convertTo, setConvertTo] = useState("romano");
  const [visible, setVisible] = useState(false);
  const [toConvert, setToConvert] = useState("");
  const [converted, setConverted] = useState("");

  const romans = {
    //unidade
    0: [
      "", //0
      "I", //1
      "II", //2
      "III", //3
      "IV", //4
      "V", //5
      "VI", //6
      "VII", //7
      "VIII", //8
      "IX", //9
    ],
    //dezena
    1: [
      "", //0
      "X", //10
      "XX", //20
      "XXX", //30
      "XL", //40
      "L", //50
      "LX", //60
      "LXX", //70
      "LXXX", //80
      "XC", //90
    ],
    //centena
    2: [
      "", //0
      "C", //100
      "CC", //200
      "CCC", //300
      "CD", //400
      "D", //500
      "DC", //600
      "DCC", //700
      "DCCC", //800
      "CM", //900
    ],
    //milhar
    3: [
      "", //0
      "M", //1000
      "MM", //2000
      "MMM", //3000
    ],
  };

  function handleSelect(e) {
    setConvertTo(e.target.value);
  }

  function handleChange(e) {
    setToConvert(e.target.value);
  }

  function handleConvert(e) {
    e.preventDefault();

    if(convertTo == "romano") {
      ToRomanConvert();
    } else {
      ToArabicConvert();
    }
  }

  //Conversão para números romanos
  function ToRomanConvert() {
    let input = parseInt(toConvert.replace(/[^0-9]/g, "")); //garante que o input terá somente números
    
    if(isNaN(input)) {
      alert("Tipo de número não suportado para a operação. Favor digitar um número Arábico.")
    } else {
      if (input > 3999) {
        alert("Valor máximo = 3999. Favor escolher um número menor!");
      }
    
      //descobrindo tamanho do número (milhar, centena, dezena, unidade)
      let number = input.toString();
      let length = number.length;
      let order = length - 1;
      let newOrder = "";
    
      let result = "";
    
      for (let i = order; i >= 0; i--) {
        newOrder += number.charAt(i);
      }
    
      //Convertendo em sequência => milhar, centena, dezena e unidade
      for (let i = order; i >= 0; i--) {
        let aux = parseInt(newOrder.charAt(i));
        result += romans[i][aux];
      }
    
      setConverted(result);
    }
  }


  //Conversão para números Arábicos
  function ToArabicConvert() {
    //conjunto auxiliar
    const numbers = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 }

    let result = 0;
    let lastNumber = null;

    let input = toConvert.replace(/[0-9]/g, ""); //garante que o input terá não terá números

    input = input.toUpperCase(); //garante que o input esteja em letra maiúscula

    if(isNaN(input)) {
      for(let i = input.length-1; i >= 0; i--) {
        let char = input.charAt(i);
        
        for(let key in numbers) {
          if(char === key) {
            let aux = parseInt(numbers[key]);
            if (lastNumber !== null) {
              if(aux < lastNumber) {
                aux = aux * -1;
              }
            }
            result += aux;
            lastNumber = aux;
          }
        }
      }
      setConverted(result);
    } else {
      alert("Tipo de número não suportado para a operação. Favor digitar um número Romano.")
    }
      
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Conversor Números romanos</title>
        <meta name="description" content="Conversor de números romanos para arábicos e vice-versa, em NextJS" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.h1}>Conversor de Números Romanos/Arábicos</h1>
        <form onSubmit={(e) => handleConvert(e)} className={styles.form}>
          <div>
            <label>Converter para:</label>
            <select
              name="converter"
              className={styles.converter}
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              <option value="romano">Romano</option>
              <option value="decimal">Decimal</option>
            </select>
          </div>
          <div className={styles.inputs}>
            <label>
              Digite um número {convertTo == "romano" ? "arábico" : "romano"}:
            </label>
            <input
              type="text"
              id="number"
              name="number"
              className={styles.number}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className={styles.resultContainer}>
            <div className={visible ? styles.result : styles.invisible}>
              {converted}
            </div>
          </div>

          <button
            className={styles.btn}
            onClick={(e) => {
              handleConvert(e);
              setVisible(true);
            }}
          >
            Converter
          </button>
        </form>
      </main>
    </div>
  );
}
