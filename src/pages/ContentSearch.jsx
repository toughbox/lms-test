import { useState, useMemo } from 'react'
import '../App.css'
import { sampleCourseData } from '../utils/sampleData'
import { 
  getNextContent, 
  getPrevContent, 
  findContentById,
  getNextChapter,
  getPrevChapter,
  findChapterById
} from '../utils/contentUtils'

function ContentSearch() {
  const [searchMode, setSearchMode] = useState('content') // 'content' or 'chapter'
  const [contentId, setContentId] = useState(2001)
  const [chapterId, setChapterId] = useState(1001)
  const [result, setResult] = useState(null)
  const [searchType, setSearchType] = useState('next') // 'next' or 'prev' or 'current'

  // 샘플 데이터에서 사용 가능한 챕터 ID 목록 추출
  const chapterIds = useMemo(() => {
    const ids = []
    const extractChapterIds = (chapters) => {
      chapters.forEach(chapter => {
        ids.push({
          id: chapter.id,
          title: chapter.title || `챕터 ${chapter.id}`
        })
        if (chapter.children && chapter.children.length > 0) {
          extractChapterIds(chapter.children)
        }
      })
    }
    if (sampleCourseData.indexes_tree) {
      extractChapterIds(sampleCourseData.indexes_tree)
    }
    return ids.sort((a, b) => a.id - b.id)
  }, [])

  // 샘플 데이터에서 사용 가능한 콘텐츠 ID 목록 추출
  const contentIds = useMemo(() => {
    const ids = []
    const extractContentIds = (chapters) => {
      chapters.forEach(chapter => {
        if (chapter.contents && Array.isArray(chapter.contents)) {
          chapter.contents.forEach(content => {
            ids.push({
              id: content.content_id,
              title: content.title || `콘텐츠 ${content.content_id}`,
              code: content.code
            })
          })
        }
        if (chapter.children && chapter.children.length > 0) {
          extractContentIds(chapter.children)
        }
      })
    }
    if (sampleCourseData.indexes_tree) {
      extractContentIds(sampleCourseData.indexes_tree)
    }
    return ids.sort((a, b) => a.id - b.id)
  }, [])

  const handleSearch = () => {
    let foundItem = null
    
    if (searchMode === 'content') {
      // 콘텐츠 검색
      if (searchType === 'next') {
        foundItem = getNextContent(sampleCourseData, contentId)
      } else if (searchType === 'prev') {
        foundItem = getPrevContent(sampleCourseData, contentId)
      } else {
        foundItem = findContentById(sampleCourseData, contentId)
      }
      
      setResult({
        mode: 'content',
        type: searchType,
        id: contentId,
        found: foundItem,
        timestamp: new Date().toLocaleTimeString()
      })
    } else {
      // 챕터 검색
      if (searchType === 'next') {
        foundItem = getNextChapter(sampleCourseData, chapterId)
      } else if (searchType === 'prev') {
        foundItem = getPrevChapter(sampleCourseData, chapterId)
      } else {
        foundItem = findChapterById(sampleCourseData, chapterId)
      }
      
      setResult({
        mode: 'chapter',
        type: searchType,
        id: chapterId,
        found: foundItem,
        timestamp: new Date().toLocaleTimeString()
      })
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>콘텐츠 & 챕터 검색 테스트</h1>
        <p>next_content_id, prev_content_id, next_id, prev_id를 사용한 검색 기능</p>
      </header>
      <main className="app-main">
        <div className="content-wrapper">
          <div className="content">
            <div className="search-section">
              <h2>검색 모드 선택</h2>
              
              <div className="form-group">
                <label>검색 대상:</label>
                <div className="radio-group">
                <label className={searchMode === 'chapter' ? 'radio-label checked' : 'radio-label'}>
                    <input
                      type="radio"
                      value="chapter"
                      checked={searchMode === 'chapter'}
                      onChange={(e) => setSearchMode(e.target.value)}
                    />
                    <span>챕터/섹션 (id)</span>
                  </label>
                  <label className={searchMode === 'content' ? 'radio-label checked' : 'radio-label'}>
                    <input
                      type="radio"
                      value="content"
                      checked={searchMode === 'content'}
                      onChange={(e) => setSearchMode(e.target.value)}
                    />
                    <span>콘텐츠 (content_id)</span>
                  </label>
                </div>
              </div>

              {searchMode === 'content' ? (
                <div className="form-group">
                  <label htmlFor="contentId">콘텐츠 ID:</label>
                  <select
                    id="contentId"
                    value={contentId}
                    onChange={(e) => setContentId(Number(e.target.value))}
                    className="select-input"
                  >
                    {contentIds.map(content => (
                      <option key={content.id} value={content.id}>
                        {content.id} - {content.title} ({content.code})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="chapterId">챕터 ID:</label>
                  <select
                    id="chapterId"
                    value={chapterId}
                    onChange={(e) => setChapterId(Number(e.target.value))}
                    className="select-input"
                  >
                    {chapterIds.map(chapter => (
                      <option key={chapter.id} value={chapter.id}>
                        {chapter.id} - {chapter.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>검색 타입:</label>
                <div className="radio-group">
                  <label className={searchType === 'current' ? 'radio-label checked' : 'radio-label'}>
                    <input
                      type="radio"
                      value="current"
                      checked={searchType === 'current'}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    <span>현재 {searchMode === 'content' ? '콘텐츠' : '챕터'}</span>
                  </label>
                  <label className={searchType === 'next' ? 'radio-label checked' : 'radio-label'}>
                    <input
                      type="radio"
                      value="next"
                      checked={searchType === 'next'}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    <span>다음 {searchMode === 'content' ? '(next_content_id)' : '(next_id)'}</span>
                  </label>
                  <label className={searchType === 'prev' ? 'radio-label checked' : 'radio-label'}>
                    <input
                      type="radio"
                      value="prev"
                      checked={searchType === 'prev'}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    <span>이전 {searchMode === 'content' ? '(prev_content_id)' : '(prev_id)'}</span>
                  </label>
                </div>
              </div>

              <button onClick={handleSearch} className="search-button">
                검색 실행
              </button>
            </div>

            <div className="result-section">
              {result ? (
                <>
                  <h3>검색 결과</h3>
                  <div className="result-info">
                    <p><strong>검색 모드:</strong> {result.mode === 'content' ? '콘텐츠' : '챕터/섹션'}</p>
                    <p><strong>검색 타입:</strong> {
                      result.type === 'next' 
                        ? `다음 ${result.mode === 'content' ? '콘텐츠' : '챕터'}` 
                        : result.type === 'prev' 
                        ? `이전 ${result.mode === 'content' ? '콘텐츠' : '챕터'}` 
                        : `현재 ${result.mode === 'content' ? '콘텐츠' : '챕터'}`
                    }</p>
                    <p><strong>검색한 {result.mode === 'content' ? '콘텐츠' : '챕터'} ID:</strong> {result.id}</p>
                    <p><strong>검색 시간:</strong> {result.timestamp}</p>
                  </div>
                  
                  {result.found ? (
                    <div className="content-details">
                      <h4>찾은 {result.mode === 'content' ? '콘텐츠' : '챕터'} 정보:</h4>
                      <pre>{JSON.stringify(result.found, null, 2)}</pre>
                    </div>
                  ) : (
                    <div className="no-result">
                      <p>{result.mode === 'content' ? '콘텐츠' : '챕터'}를 찾을 수 없습니다.</p>
                      {result.type === 'next' && (
                        <p>
                          다음 {result.mode === 'content' ? '콘텐츠' : '챕터'}가 없거나 
                          {result.mode === 'content' ? 'next_content_id' : 'next_id'}가 설정되지 않았습니다.
                        </p>
                      )}
                      {result.type === 'prev' && (
                        <p>
                          이전 {result.mode === 'content' ? '콘텐츠' : '챕터'}가 없거나 
                          {result.mode === 'content' ? 'prev_content_id' : 'prev_id'}가 설정되지 않았습니다.
                        </p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="result-placeholder">
                  <h3>검색 결과</h3>
                  <p>왼쪽에서 검색 조건을 선택하고 "검색 실행" 버튼을 클릭하세요.</p>
                </div>
              )}
            </div>
          </div>

          <div className="sample-data-section">
            <h3>샘플 데이터</h3>
            <details>
              <summary>전체 코스 데이터 보기</summary>
              <pre className="sample-json">{JSON.stringify(sampleCourseData, null, 2)}</pre>
            </details>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContentSearch

