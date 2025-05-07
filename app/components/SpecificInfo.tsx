'use client'

import React, { useEffect, useState } from 'react'

type IssueDetail = {
  id: string
  number: number
  title: string
  url: string
  createdAt: string
  body: string
}

type GitHubResponse = {
  data: {
    repository: {
      issues: {
        edges: {
          node: IssueDetail
        }[]
      }
    }
  }
}

export default function LastIssue() {
  const [issue, setIssue] = useState<IssueDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLastIssue = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
      const query = `
        query {
          repository(owner: "facebook", name: "react") {
            issues(first: 1, states: OPEN, orderBy: { field: CREATED_AT, direction: DESC }) {
              edges {
                node {
                  id
                  number
                  title
                  url
                  createdAt
                  body
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

        const node = json.data.repository.issues.edges[0]?.node
        if (node) {
          setIssue(node)
        } else {
          setError('Kein Issue gefunden.')
        }
      } catch (err) {
        if (err instanceof Error) {
          setError('Fehler beim Laden: ' + err.message)
        } else {
          setError('Unbekannter Fehler')
        }
      }
    }

    fetchLastIssue()
  }, [])

  if (error) return <div>{error}</div>
  if (!issue) return <div>Lade...</div>

  return (
    <div>
      <h2>Genaue Informationen zur letzten Issue:</h2>
      <br />
      <h3>
        <a href={issue.url} target="_blank" rel="noopener noreferrer">
          #{issue.number}: {issue.title}
        </a>
      </h3>
      <p>
        <strong>Erstellt am:</strong> {new Date(issue.createdAt).toLocaleString()}
      </p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{issue.body}</pre>
    </div>
  )
}
