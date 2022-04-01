import styles from '../styles/Home.module.css'

function CssCopyArea({ value }){
  function copyContent(value){
    navigator.clipboard.writeText(value)
    alert('Border Radius copiado!!')
  }

  return(
    <div id={styles.cssCopyArea}>
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

function Dimension({
  name,
  value,
  setDimension
}){
  return(
    <div>
      <label className={styles.dimensionLabel} htmlFor={name}>
        {name}:
      </label>
      <br/>
      <input
        type='text'
        name={name}
        className={styles.dimensionInput}
        value={value}
        onChange={(event) => setDimension(event.target.value)}
      />
    </div>
  )
}

function BoxSize({
  boxWidth,
  setBoxWidth,
  boxHeight,
  setBoxHeight
}){
  return(
    <div>
      <Dimension
        name='Width'
        value={boxWidth}
        setDimension={setBoxWidth}
      />

      <Dimension
        name='Height'
        value={boxHeight}
        setDimension={setBoxHeight}
      />
    </div>
  )
}

function ExtrasContainer({
  cssCopyAreaValue,
  boxWidth,
  setBoxWidth,
  boxHeight,
  setBoxHeight
}){
  return(
    <div id={styles.extrasContainer}>
      <BoxSize
        boxWidth={boxWidth}
        setBoxWidth={setBoxWidth}
        boxHeight={boxHeight}
        setBoxHeight={setBoxHeight}
      />

      <CssCopyArea
        value={cssCopyAreaValue}
      />
    </div>
  )
}

export { ExtrasContainer }
