'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/CodingChallengePage.module.css'

type Issue = {
  id: string
  title: string
  url: string
  number: number
}

type GitHubResponse = {
  data: {
    repository: {
      issues: {
        edges: {
          node: Issue
        }[]
      }
    }
  }
}

const CodingChallengeLandingPage = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const issueState = isOpen ? 'OPEN' : 'CLOSED'

  const fetchIssues = async (state: 'OPEN' | 'CLOSED') => {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
    const query = `
      query {
        repository(owner: "facebook", name: "react") {
          issues(first: 20, states: ${state}, orderBy: {field: CREATED_AT, direction: DESC}) {
            edges {
              node {
                id
                title
                number
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

      const nodes = json.data.repository.issues.edges.map(edge => edge.node)
      setIssues(nodes)
    } catch (err) {
      if (err instanceof Error) {
        setError('Fehler beim Laden: ' + err.message)
      } else {
        setError('Unbekannter Fehler')
      }
    }
  }
  useEffect(() => {
    fetchIssues(issueState)
  }, [isOpen, issueState])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  if (error) return <div>{error}</div>
  if (!issues.length) return <div>Lade...</div>

  return (
    <>
      <div className={styles.border}>
        <h1 className={styles.h1}>Coding Challenge Jonas Fischer</h1>

        <div className={styles.Issues}>
          <button className={styles.buttonIssueState} onClick={handleClick}>
            {isOpen ? 'OPEN' : 'CLOSED'}
          </button>
          <div>
            <h2>Letzte 20 {isOpen ? 'Offene' : 'Geschlossene'} Issues für React:</h2>
            <br />
            <ul>
              {issues.map(issue => (
                <li key={issue.id}>
                  <Link href={`/${issue.number}`}>
                    #{issue.number}: {issue.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default CodingChallengeLandingPage
