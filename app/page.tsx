import LatestIssues from './components/LatestIssues'
import styles from '../styles/CodingChallengePage.module.css'

const CodingChallengeLandingPage = () => {
  return (
    <>
      <div className={styles.border}>
        <h1 className={styles.h1}>Coding Challenge Jonas Fischer</h1>
        <div className={styles.Issues}>
          <LatestIssues />
        </div>
      </div>
    </>
  )
}
export default CodingChallengeLandingPage
