import { useState } from 'react'
import { lmsSampleData } from '../utils/lmsSampleData'
import '../App.css'
import './LmsSampleJson.css'

function LmsSampleJson() {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['course', 'learning_index-0']))

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const formatValue = (value) => {
    if (value === null) return <span className="null-value">null</span>
    if (value === undefined) return <span className="undefined-value">undefined</span>
    if (typeof value === 'boolean') return <span className="boolean-value">{value.toString()}</span>
    if (typeof value === 'number') return <span className="number-value">{value}</span>
    if (typeof value === 'string') {
      // 날짜 형식인지 확인
      if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return <span className="date-value">"{value}"</span>
      }
      return <span className="string-value">"{value}"</span>
    }
    return JSON.stringify(value)
  }

  const renderObject = (obj, path = '', level = 0) => {
    if (obj === null || obj === undefined) {
      return <span className="null-value">null</span>
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return <span className="empty-array">[]</span>
      }
      const nodeId = path
      const isExpanded = expandedNodes.has(nodeId)
      
      return (
        <div className="tree-node">
          <div 
            className="tree-node-header"
            onClick={() => toggleNode(nodeId)}
            style={{ paddingLeft: `${level * 20}px` }}
          >
            <span className="tree-toggle">{isExpanded ? '▼' : '▶'}</span>
            <span className="array-badge">Array</span>
            <span className="array-length">({obj.length})</span>
          </div>
          {isExpanded && (
            <div className="tree-node-children">
              {obj.map((item, index) => (
                <div key={index} className="tree-item">
                  <span className="array-index">[{index}]</span>
                  {typeof item === 'object' && item !== null ? (
                    renderObject(item, `${path}-${index}`, level + 1)
                  ) : (
                    <span className="tree-value">{formatValue(item)}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (typeof obj === 'object') {
      const keys = Object.keys(obj)
      if (keys.length === 0) {
        return <span className="empty-object">{'{}'}</span>
      }
      
      const nodeId = path || 'root'
      const isExpanded = expandedNodes.has(nodeId)
      
      return (
        <div className="tree-node">
          <div 
            className="tree-node-header"
            onClick={() => toggleNode(nodeId)}
            style={{ paddingLeft: `${level * 20}px` }}
          >
            <span className="tree-toggle">{isExpanded ? '▼' : '▶'}</span>
            <span className="object-badge">Object</span>
            {path && <span className="object-key">{path.split('-').pop()}</span>}
            <span className="object-keys-count">({keys.length} keys)</span>
          </div>
          {isExpanded && (
            <div className="tree-node-children">
              {keys.map((key) => {
                const value = obj[key]
                const childPath = path ? `${path}.${key}` : key
                const isChildExpanded = expandedNodes.has(childPath)
                
                return (
                  <div key={key} className="tree-item">
                    <span 
                      className="tree-key"
                      onClick={() => typeof value === 'object' && value !== null && toggleNode(childPath)}
                    >
                      {key}:
                    </span>
                    {typeof value === 'object' && value !== null ? (
                      renderObject(value, childPath, level + 1)
                    ) : (
                      <span className="tree-value">{formatValue(value)}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )
    }

    return <span className="tree-value">{formatValue(obj)}</span>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>LMS Sample JSON</h1>
        <p>학습 인덱스 데이터를 트리 구조로 시각화</p>
      </header>
      <main className="app-main">
        <div className="lms-content-wrapper">
          <div className="course-info-section">
            <h2>과정 정보</h2>
            <div className="course-info-card">
              <div className="info-row">
                <span className="info-label">과정명:</span>
                <span className="info-value">{lmsSampleData.course.title}</span>
              </div>
              <div className="info-row">
                <span className="info-label">과정 코드:</span>
                <span className="info-value">{lmsSampleData.course.code}</span>
              </div>
              <div className="info-row">
                <span className="info-label">요약:</span>
                <span className="info-value">{lmsSampleData.course.summary}</span>
              </div>
              <div className="info-row">
                <span className="info-label">예상 학습시간:</span>
                <span className="info-value">{lmsSampleData.course.estimated_hours}시간</span>
              </div>
              <div className="info-row">
                <span className="info-label">난이도:</span>
                <span className="info-value badge">{lmsSampleData.course.difficulty}</span>
              </div>
              <div className="info-row">
                <span className="info-label">언어:</span>
                <span className="info-value">{lmsSampleData.course.language}</span>
              </div>
            </div>
          </div>

          <div className="tree-view-section">
            <h2>학습 인덱스 트리 구조</h2>
            <div className="tree-container">
              {renderObject(lmsSampleData)}
            </div>
          </div>

          <div className="raw-json-section">
            <h2>원본 JSON 데이터</h2>
            <details>
              <summary>전체 JSON 데이터 보기</summary>
              <pre className="sample-json">{JSON.stringify(lmsSampleData, null, 2)}</pre>
            </details>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LmsSampleJson

