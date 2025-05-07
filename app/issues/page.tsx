import LastIssue from '../components/SpecificInfo'
import LastIssueWithComments from '../components/LatestComments'
import styles from '../../styles/CodingChallengePage.module.css'

const CodingChallengePage = () => {
  return (
    <>
      <div className={styles.border}>
        <h1 className={styles.h1}>More Details!</h1>
        <div className={styles.IssueInfo}>
          <LastIssue />
        </div>
        <div className={styles.IssueComments}>
          <LastIssueWithComments />
        </div>
      </div>
    </>
  )
}
export default CodingChallengePage
