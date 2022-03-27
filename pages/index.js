import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

function Box({
  setCssCopyAreaValue,
  topLeftCorner,
  downLeftCorner,
  topRightCorner,
  downRightCorner
}){

  function equalizeValues(value){
    topLeftCorner = value
    topRightCorner = value
    downRightCorner = value
    downLeftCorner = value
  }

  function adjustToCssRules(valueOne, valueTwo){
    topLeftCorner = valueOne
    topRightCorner = valueTwo
    downRightCorner = valueOne
    downLeftCorner = valueTwo
  }

  function checkHowManyValuesHaveChanged(){
    let valuesChanged = 0, valuesThatHaveChanged = []
    for (let corner of [topLeftCorner, downLeftCorner, topRightCorner, downRightCorner]) {
      if(corner != '') {
        valuesChanged += 1
        valuesThatHaveChanged.push(corner)
      }
    }
    return {
      valuesChanged: valuesChanged,
      valuesThatHaveChanged: valuesThatHaveChanged
    }
  }

  function applyTheRuleDepedingOnHowManyValuesHaveChanged(){
    const checkHowManyValuesHaveChangedReturn = checkHowManyValuesHaveChanged()
    const valuesChanged = checkHowManyValuesHaveChangedReturn.valuesChanged
    const valuesThatHaveChanged = checkHowManyValuesHaveChangedReturn.valuesThatHaveChanged
    
    if(valuesChanged == 1) equalizeValues(valuesThatHaveChanged[0])
    else if(valuesChanged == 2) adjustToCssRules(valuesThatHaveChanged[0], valuesThatHaveChanged[1])
  }

  applyTheRuleDepedingOnHowManyValuesHaveChanged()

  let value = `${topLeftCorner} ${topRightCorner} ${downRightCorner} ${downLeftCorner}`
  setCssCopyAreaValue(`border-radius: ${value};`)

  return <div id={styles.box} style={{borderRadius: value}}></div>
}

function PointModifier({
  corner,
  setCorner
}){
  return(
    <div>
      <input
        type="text"
        className={styles.pointModifier}
        value={corner}
        onChange={(event) => setCorner(event.target.value)}
      />
    </div>
  )
}

function SideBox({
  topCorner,
  setTopCorner,
  downCorner,
  setDownCorner
}){
  return(
    <div className={styles.sideBox}>
      <PointModifier
        corner={topCorner}
        setCorner={setTopCorner}
      />

      <PointModifier
        corner={downCorner}
        setCorner={setDownCorner}
      />
    </div>
  )
}

function BoxContainer({ setCssCopyAreaValue }){
  const [topRightCorner, setTopRightCorner] = useState('')
  const [topLeftCorner, setTopLeftCorner] = useState('')
  const [downRightCorner, setDownRightCorner] = useState('')
  const [downLeftCorner, setDownLeftCorner] = useState('')

  return(
    <div id={styles.boxContainer}>
      <SideBox
        topCorner={topLeftCorner}
        setTopCorner={setTopLeftCorner}
        downCorner={downLeftCorner}
        setDownCorner={setDownLeftCorner}
      />
      
      <Box
        setCssCopyAreaValue={setCssCopyAreaValue}
        topLeftCorner={topLeftCorner}
        downLeftCorner={downLeftCorner}
        topRightCorner={topRightCorner}
        downRightCorner={downRightCorner}
      />
      
      <SideBox
        topCorner={topRightCorner}
        setTopCorner={setTopRightCorner}
        downCorner={downRightCorner}
        setDownCorner={setDownRightCorner}
      />
    </div>
  )
}

function CssCopyArea({ value }){
  function copyContent(value){
    navigator.clipboard.writeText(value)
  }

  return(
    <div>
      <input
        id={styles.cssCopyAreaValue}
        type='text'
        value={value}
        readOnly
      />

      <button
        id={styles.cssCopyAreaButton}
        onClick={() => copyContent(value)}
      >
        Copiar
      </button>
    </div>
  )
}

function ExtrasContainer({
  cssCopyAreaValue
}){
  return(
    <div>
      <CssCopyArea
        value={cssCopyAreaValue}
      />
    </div>
  )
}

export default function Home() {
  const [cssCopyAreaValue, setCssCopyAreaValue] = useState('border-radius: 0;')

  return (
    <div className={styles.container}>
      <Head>
        <title>CSS | Border Radius - Gerador/Pré-visualizador</title>
        <meta name="description" content="Simples gerador/pré-visualizador de Border Radius" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BoxContainer
          setCssCopyAreaValue={setCssCopyAreaValue}
        />

        <ExtrasContainer
          cssCopyAreaValue={cssCopyAreaValue}
        />
      </main>
    </div>
  )
}
