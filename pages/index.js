import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, createContext, useContext } from 'react'
import { ExtrasContainer } from '../components/extras'

const BoxContext = createContext()

function Box({
  topLeftCorner,
  downLeftCorner,
  topRightCorner,
  downRightCorner
}){

  const [boxWidth, boxHeight, setCssCopyAreaValue] = useContext(BoxContext)

  function equalizeValues(value){
    topLeftCorner = value
    topRightCorner = ''
    downRightCorner = ''
    downLeftCorner = ''
  }

  function adjustToCssRules(valueOne, valueTwo){
    topLeftCorner = valueOne
    topRightCorner = valueTwo
    downRightCorner = ''
    downLeftCorner = ''
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

  return <div id={styles.box} style={
    {
      borderRadius: value,
      width: boxWidth,
      height: boxHeight
    }
    }></div>
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

function BoxContainer(){
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

export default function Home() {
  const [cssCopyAreaValue, setCssCopyAreaValue] = useState('border-radius: 0;')
  const [boxWidth, setBoxWidth] = useState('128px')
  const [boxHeight, setBoxHeight] = useState('128px')

  return (
    <div className={styles.container}>
      <Head>
        <title>CSS | Border Radius - Gerador/Pré-visualizador</title>
        <meta name="description" content="Simples gerador/pré-visualizador de Border Radius" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BoxContext.Provider value={[boxWidth, boxHeight, setCssCopyAreaValue]}>
          <BoxContainer/>
        </BoxContext.Provider>

        <ExtrasContainer
          cssCopyAreaValue={cssCopyAreaValue}
          boxWidth={boxWidth}
          setBoxWidth={setBoxWidth}
          boxHeight={boxHeight}
          setBoxHeight={setBoxHeight}
        />
      </main>
    </div>
  )
}
