import ReactIssues from './components/LatestIssues'
import styles from '../styles/CodingChallengePage.module.css'

const CodingChallengePage = () => {
  return (
    <>
      <div className={styles.border}>
        <h1 className={styles.h1}>Coding Challenge Jonas Fischer</h1>
        <div className={styles.Issues}>
          <ReactIssues />
        </div>
      </div>
    </>
  )
}
export default CodingChallengePage
