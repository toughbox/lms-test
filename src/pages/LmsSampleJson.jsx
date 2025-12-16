import { useState } from 'react'
import { JsonView, allExpanded, collapseAllNested, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'
import { lmsSampleData } from '../utils/lmsSampleData'
import '../App.css'
import './LmsSampleJson.css'

function LmsSampleJson() {
  const [shouldExpand, setShouldExpand] = useState(() => collapseAllNested)
  const [key, setKey] = useState(0) // 컴포넌트 재마운트를 위한 key

  // 전체 펼치기
  const expandAll = () => {
    setShouldExpand(() => allExpanded)
    setKey(prev => prev + 1) // key 변경으로 컴포넌트 재마운트
  }

  // 전체 접기
  const collapseAll = () => {
    setShouldExpand(() => collapseAllNested)
    setKey(prev => prev + 1) // key 변경으로 컴포넌트 재마운트
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
            </div>
          </div>

          <div className="tree-view-section">
            <div className="tree-view-header">
              <h2>학습 인덱스 트리 구조</h2>
              <div className="tree-controls">
                <button onClick={expandAll} className="tree-control-btn expand-all">
                  전체 펼치기
                </button>
                <button onClick={collapseAll} className="tree-control-btn collapse-all">
                  전체 접기
                </button>
              </div>
            </div>
            <div className="tree-container">
              <JsonView 
                key={key}
                data={lmsSampleData}
                shouldExpandNode={shouldExpand}
                style={defaultStyles}
              />
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
