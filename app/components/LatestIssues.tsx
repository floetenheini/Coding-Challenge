'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

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

export default function LatestIssues() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIssues = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
      const query = `
        query {
          repository(owner: "facebook", name: "react") {
            issues(first: 20, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
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

    fetchIssues()
  }, [])

  if (error) return <div>{error}</div>
  if (!issues.length) return <div>Lade...</div>

  return (
    <div>
      <h2>Last 20 Issues for React:</h2>
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
  )
}
