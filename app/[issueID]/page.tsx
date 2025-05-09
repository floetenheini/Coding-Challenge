'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import styles from '../../styles/CodingChallengePage.module.css'

type Comment = {
  id: string
  body: string
  createdAt: string
  author: {
    login: string
    url: string
  }
}

type IssueDetail = {
  id: string
  number: number
  title: string
  url: string
  createdAt: string
  body: string
  comments: {
    nodes: Comment[]
  }
}

type GitHubResponse = {
  data: {
    repository: {
      issue: IssueDetail | null
    }
  }
}

const CodingChallengeDetailsPage = () => {
  const [issue, setIssue] = useState<IssueDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  const params = useParams()
  const issueNumberRaw = params?.issueID

  useEffect(() => {
    if (!issueNumberRaw || Array.isArray(issueNumberRaw)) {
      setError('Ungültige Issue-Nummer in der URL.')
      return
    }

    const issueNumber = parseInt(issueNumberRaw, 10)
    if (isNaN(issueNumber)) {
      setError('Ungültige Issue-Nummer.')
      return
    }

    const fetchIssue = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
      const query = `
  query {
    repository(owner: "facebook", name: "react") {
      issue(number: ${issueNumber}) {
        id
        number
        title
        url
        createdAt
        body
        comments(first: 10) {
          nodes {
            id
            body
            author {
              login
              url
            }
            createdAt
          }
        }
      }
    }
  }
`

      try {
        const res = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        })

        const json: GitHubResponse = await res.json()

        const issueData = json?.data?.repository?.issue
        if (issueData) {
          setIssue(issueData)
        } else {
          setError('Issue nicht gefunden.')
        }
      } catch (err) {
        console.error('Fehler:', err)
        setError('Fehler beim Laden der Daten.')
      }
    }

    fetchIssue()
  }, [issueNumberRaw])

  if (error) return <div>{error}</div>
  if (!issue) return <div>Lade...</div>

  return (
    <>
      <div className={styles.border}>
        <h1 className={styles.h1}>More Details!</h1>
        <div className={styles.IssueInfo}>
          <h2>Details zum Issue #{issue.number}</h2>
          <h3>
            <a href={issue.url} target="_blank" rel="noopener noreferrer">
              {issue.title}
            </a>
          </h3>
          <p>
            <strong>Erstellt am:</strong> {new Date(issue.createdAt).toLocaleString()}
          </p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{issue.body}</pre>
        </div>
        <div className={styles.IssueComments}>
          <div>
            <h3>Kommentare zum Issue #{issue.number}</h3>
            {issue.comments.nodes.length === 0 ? (
              <p>Keine Kommentare vorhanden.</p>
            ) : (
              issue.comments.nodes.map(comment => (
                <div key={comment.id} className={styles.comment}>
                  <p>
                    <strong>
                      <a href={comment.author.url} target="_blank" rel="noopener noreferrer">
                        {comment.author.login}
                      </a>
                    </strong>{' '}
                    kommentierte am {new Date(comment.createdAt).toLocaleString()}
                  </p>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</pre>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default CodingChallengeDetailsPage
