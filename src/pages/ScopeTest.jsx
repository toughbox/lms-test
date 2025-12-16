import { useState, useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import { scopeTestCourseData } from '../utils/scopeTestData'
import './ScopeTest.css'

function ScopeTest() {
  const [allNodes, setAllNodes] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [currentContents, setCurrentContents] = useState([])
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [nextScopeNo, setNextScopeNo] = useState(1)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const mermaidOutputRef = useRef(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' })
    
    if (scopeTestCourseData && scopeTestCourseData.indexes_tree) {
      const nodes = []
      buildNodeList(scopeTestCourseData.indexes_tree, '', nodes)
      setAllNodes(nodes)
    }
  }, [])

  const buildNodeList = (nodes, parentPath, result) => {
    nodes.forEach(node => {
      const path = parentPath ? `${parentPath} > ${node.title}` : node.title
      const allContents = collectAllContents(node)

      if (allContents.length > 0) {
        result.push({
          ...node,
          fullPath: path,
          aggregatedContents: allContents,
          type: node.type
        })
      }

      if (node.children) {
        buildNodeList(node.children, path, result)
      }
    })
  }

  const collectAllContents = (node) => {
    let contents = []
    if (node.contents && node.contents.length > 0) {
      contents = contents.concat(node.contents)
    }
    if (node.children) {
      node.children.forEach(child => {
        contents = contents.concat(collectAllContents(child))
      })
    }
    return contents
  }

  const loadNodeContents = (index) => {
    if (index === '') return

    const node = allNodes[parseInt(index)]
    setSelectedNode(node)
    
    const contents = node.aggregatedContents || []
    
    // Normalize Data
    contents.forEach(item => {
      if (item.scope_no === undefined) item.scope_no = null
      if (item.group_no === undefined) item.group_no = null
      if (item.concurrent_view_no === undefined) item.concurrent_view_no = null
      if (item.concurrent_play_no === undefined) item.concurrent_play_no = null
      if (item.selection_no === undefined) item.selection_no = null
      if (item.selection_value === undefined) item.selection_value = null
    })

    setCurrentContents(contents)
    setSelectedItems(new Set())
    
    // Calculate next scope no
    let maxScope = 0
    contents.forEach(item => {
      if(item.scope_no && item.scope_no > maxScope) maxScope = item.scope_no
    })
    setNextScopeNo(maxScope + 1)
    
    refreshDiagram(contents)
  }

  const toggleSelection = (idx) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(idx)) {
      newSelected.delete(idx)
    } else {
      newSelected.add(idx)
    }
    setSelectedItems(newSelected)
  }

  const toggleSelectAll = (checked) => {
    if (checked) {
      const allIndices = new Set(currentContents.map((_, idx) => idx))
      setSelectedItems(allIndices)
    } else {
      setSelectedItems(new Set())
    }
  }

  const assignScope = () => {
    if (selectedItems.size === 0) {
      alert('항목을 선택하세요.')
      return
    }

    const scopeNo = nextScopeNo
    setNextScopeNo(nextScopeNo + 1)
    
    const newContents = [...currentContents]
    selectedItems.forEach(idx => {
      newContents[idx].scope_no = scopeNo
    })

    setCurrentContents(newContents)
    setSelectedItems(new Set())
    refreshDiagram(newContents)
  }

  const assignGroup = () => {
    if (selectedItems.size === 0) {
      alert('항목을 선택하세요.')
      return
    }

    const input = prompt("그룹 번호를 입력하세요 (예: 1):", "1")
    if (input === null) return
    const val = parseInt(input, 10)
    if (isNaN(val)) {
      alert("유효한 숫자를 입력하세요.")
      return
    }
    
    const newContents = [...currentContents]
    selectedItems.forEach(idx => {
      newContents[idx].group_no = val
    })

    setCurrentContents(newContents)
    setSelectedItems(new Set())
    refreshDiagram(newContents)
  }

  const assignConcurrentView = () => {
    if (selectedItems.size === 0) {
      alert('항목을 선택하세요.')
      return
    }
    
    const input = prompt("동시 표시 그룹 번호를 입력하세요 (예: 1):", "1")
    if (input === null) return
    const val = parseInt(input, 10)
    if (isNaN(val)) {
      alert("유효한 숫자를 입력하세요.")
      return
    }

    const newContents = [...currentContents]
    selectedItems.forEach(idx => {
      newContents[idx].concurrent_view_no = val
    })

    setCurrentContents(newContents)
    setSelectedItems(new Set())
    refreshDiagram(newContents)
  }

  const assignConcurrentPlay = () => {
    if (selectedItems.size === 0) {
      alert('항목을 선택하세요.')
      return
    }
    
    const input = prompt("동시 재생 그룹 번호를 입력하세요 (예: 1):", "1")
    if (input === null) return
    const val = parseInt(input, 10)
    if (isNaN(val)) {
      alert("유효한 숫자를 입력하세요.")
      return
    }

    const newContents = [...currentContents]
    selectedItems.forEach(idx => {
      newContents[idx].concurrent_play_no = val
    })

    setCurrentContents(newContents)
    setSelectedItems(new Set())
    refreshDiagram(newContents)
  }

  const assignSelection = () => {
    if (selectedItems.size === 0) {
      alert('항목을 선택하세요.')
      return
    }
    
    const noInput = prompt("선택지 그룹 번호(selection_no)를 입력하세요 (예: 1):", "1")
    if (noInput === null) return
    const noVal = parseInt(noInput, 10)
    if (isNaN(noVal)) {
      alert("유효한 숫자를 입력하세요.")
      return
    }
    
    const valInput = prompt("선택지 값(selection_value)을 입력하세요 (예: Y, N, 1):", "Y")
    if (valInput === null) return

    const newContents = [...currentContents]
    selectedItems.forEach(idx => {
      newContents[idx].selection_no = noVal
      newContents[idx].selection_value = valInput
    })

    setCurrentContents(newContents)
    setSelectedItems(new Set())
    refreshDiagram(newContents)
  }

  const clearAssignment = () => {
    if (selectedItems.size === 0) {
      alert('초기화할 항목을 선택하세요.')
      return
    }

    if(confirm('선택한 항목의 모든 설정(Scope, Group 등)을 초기화하시겠습니까?')) {
      const newContents = [...currentContents]
      selectedItems.forEach(idx => {
        newContents[idx].scope_no = null
        newContents[idx].group_no = null
        newContents[idx].concurrent_view_no = null
        newContents[idx].concurrent_play_no = null
        newContents[idx].selection_no = null
        newContents[idx].selection_value = null
      })
      setCurrentContents(newContents)
      setSelectedItems(new Set())
      refreshDiagram(newContents)
    }
  }

  const refreshDiagram = async (contents) => {
    if (!contents || contents.length === 0) {
      if (mermaidOutputRef.current) {
        mermaidOutputRef.current.innerHTML = ''
      }
      return
    }

    const lines = ['graph LR']

    // Group by Scope first
    const scopes = {}
    const orphans = []

    contents.forEach(item => {
      if (item.scope_no) {
        if (!scopes[item.scope_no]) scopes[item.scope_no] = []
        scopes[item.scope_no].push(item)
      } else {
        orphans.push(item)
      }
    })

    // Draw Scopes
    Object.keys(scopes).sort((a,b)=>a-b).forEach(sNo => {
      lines.push(`    subgraph Scope${sNo} ["Scope ${sNo}"]`)
      lines.push(`        direction TB`)
      
      const innerGroups = {}
      scopes[sNo].forEach(item => {
        const gNo = item.group_no !== null ? item.group_no : 'None'
        if (!innerGroups[gNo]) innerGroups[gNo] = []
        innerGroups[gNo].push(item)
      })

      Object.keys(innerGroups).sort().forEach(gNo => {
        if (gNo !== 'None') {
          lines.push(`        subgraph S${sNo}G${gNo} ["Group ${gNo}"]`)
          innerGroups[gNo].forEach(item => {
            const vLabel = item.concurrent_view_no !== null ? `V:${item.concurrent_view_no}` : ''
            const pLabel = item.concurrent_play_no !== null ? `P:${item.concurrent_play_no}` : ''
            const sLabel = item.selection_no !== null ? `S:${item.selection_no}(${item.selection_value})` : ''
            const extra = [vLabel, pLabel, sLabel].filter(Boolean).join(' ')
            const label = extra ? `${item.title}<br/>(${extra})` : item.title
            lines.push(`            N${item.content_id}["${label}"]`)
          })
          lines.push(`        end`)
        } else {
          innerGroups[gNo].forEach(item => {
            lines.push(`        N${item.content_id}["${item.title}"]`)
          })
        }
      })

      lines.push(`    end`)
    })

    // Draw Orphans
    orphans.forEach(item => {
      lines.push(`    N${item.content_id}["${item.title}"]`)
    })
    
    // Draw Concurrent View Links
    const viewGroups = {}
    contents.forEach(item => {
      if (item.concurrent_view_no !== null) {
        const key = `${item.scope_no}_${item.concurrent_view_no}`
        if (!viewGroups[key]) viewGroups[key] = []
        viewGroups[key].push(item.content_id)
      }
    })

    Object.values(viewGroups).forEach(ids => {
      if (ids.length > 1) {
        for (let i = 0; i < ids.length - 1; i++) {
          lines.push(`    N${ids[i]} -.- N${ids[i+1]}`)
        }
      }
    })
    
    lines.push(`    linkStyle default stroke:#64748b,stroke-width:1px;`)

    const graphDef = lines.join('\n')
    
    if (mermaidOutputRef.current) {
      mermaidOutputRef.current.innerHTML = ''
      try {
        const { svg } = await mermaid.render('diagram-' + Date.now(), graphDef)
        mermaidOutputRef.current.innerHTML = svg
      } catch (e) {
        console.warn(e)
        mermaidOutputRef.current.innerHTML = `<pre style="color:#999;">Diagram Render Error</pre>`
      }
    }
  }

  const exportJson = () => {
    if (!currentContents || currentContents.length === 0) {
      alert('내보낼 데이터가 없습니다.')
      return
    }

    const exportedContents = currentContents.map(item => ({
      content_id: item.content_id,
      title: item.title,
      type_code: item.type_code,
      scope_no: item.scope_no,
      group_no: item.group_no,
      concurrent_view_no: item.concurrent_view_no,
      concurrent_play_no: item.concurrent_play_no,
      selection_no: item.selection_no,
      selection_value: item.selection_value
    }))

    const exportData = {
      exported_at: new Date().toISOString(),
      contents: exportedContents
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'course_data_converted.json'
    a.click()
  }

  return (
    <div className="scope-test-container">
      <div className="header">
        <h1>📐 CMS 3.0 Scope/Group Manager</h1>
        <div style={{display:'flex', gap:'10px'}}>
          <button className="btn btn-secondary" onClick={() => setShowHelpModal(true)}>❓ 설명 확인</button>
          <button className="btn btn-secondary" onClick={exportJson}>💾 JSON 내보내기</button>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="modal" style={{display: 'flex'}} onClick={(e) => {
          if (e.target.className === 'modal') setShowHelpModal(false)
        }}>
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowHelpModal(false)}>&times;</span>
            <h2 style={{marginTop:0}}>📋 데이터 필드 상세 설명</h2>
            <p style={{color:'#666', fontSize:'0.9rem'}}>새로운 스코프/그룹 로직에 맞춘 필드 설명입니다.</p>

            <table className="help-table">
              <thead>
                <tr>
                  <th style={{width: '30%'}}>필드명</th>
                  <th>설명 및 역할</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>scope_no</code></td>
                  <td>
                    <b>화면 단위 (Scope)</b><br/>
                    학습자가 한 화면 씬에서 볼 수 있는 범위입니다.<br/>
                    (1, 2, 3...)
                  </td>
                </tr>
                <tr>
                  <td><code>group_no</code></td>
                  <td>
                    <b>화면 내 세트 (Sub-Group)</b><br/>
                    같은 Scope 내에서 묶음별로 움직이는 단위입니다.<br/>
                    - 이미지: 0<br/>
                    - 비디오/오디오: 1<br/>
                    - 퀴즈: 2
                  </td>
                </tr>
                <tr>
                  <td><code>concurrent_view_no</code></td>
                  <td>
                    <b>동시 표시 그룹</b><br/>
                    동시에 화면에 표시되어야 하는 요소들의 그룹 번호입니다.<br/>
                    (보통 group_no와 동일)
                  </td>
                </tr>
                <tr>
                  <td><code>concurrent_play_no</code></td>
                  <td>
                    <b>동시 재생 그룹</b><br/>
                    동시에 재생되어야 하는 요소들의 그룹 번호입니다.<br/>
                    (보통 group_no와 동일)
                  </td>
                </tr>
                <tr>
                  <td><code>selection_no</code></td>
                  <td>
                    <b>선택지 그룹 (종속성)</b><br/>
                    특정 선택지나 조건에 따라 분기되는 그룹 번호입니다.
                  </td>
                </tr>
                <tr>
                  <td><code>selection_value</code></td>
                  <td>
                    <b>선택지 값 (종속성)</b><br/>
                    해당 그룹 내에서 특정 값일 때 활성화됩니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="toolbar">
        <select onChange={(e) => loadNodeContents(e.target.value)} defaultValue="">
          <option value="">-- 챕터/레슨 선택 --</option>
          {allNodes.map((node, index) => {
            const prefix = node.type === 'CHAPTER' ? '📁 ' : '📄 '
            return (
              <option key={index} value={index}>
                {prefix + node.fullPath}
              </option>
            )
          })}
        </select>
        <div style={{borderLeft: '1px solid #ccc', height: '30px', margin: '0 10px'}}></div>
        
        <button className="btn btn-scope" onClick={assignScope}>📌 Scope 할당</button>
        <button className="btn btn-group" onClick={assignGroup}>📺 Group 할당</button>
        <button className="btn btn-view" onClick={assignConcurrentView}>👀 동시표시</button>
        <button className="btn btn-play" onClick={assignConcurrentPlay}>⚡ 동시재생</button>
        <button className="btn btn-sel" onClick={assignSelection}>🔗 종속설정</button>
        <button className="btn btn-secondary" onClick={clearAssignment}>✖️ 초기화</button>
      </div>

      <div className="main-content">
        <div className="panel left-panel">
          <div className="panel-header">
            <span>📋 콘텐츠 목록</span>
            <span style={{color:'#64748b', fontWeight:'normal'}}>{currentContents.length}개 항목</span>
          </div>
          <div className="panel-body" style={{padding:0}}>
            <table>
              <thead>
                <tr>
                  <th className="cell-checkbox">
                    <input type="checkbox" onChange={(e) => toggleSelectAll(e.target.checked)} />
                  </th>
                  <th>ID</th>
                  <th>제목</th>
                  <th>유형</th>
                  <th>Scope</th>
                  <th>Group</th>
                  <th>C.View</th>
                  <th>C.Play</th>
                  <th>Sel.No</th>
                  <th>Sel.Val</th>
                </tr>
              </thead>
              <tbody>
                {currentContents.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{textAlign:'center', color:'#999', padding:'40px'}}>
                      챕터를 선택하세요
                    </td>
                  </tr>
                ) : (
                  currentContents.map((item, idx) => {
                    const scopeBadge = item.scope_no ? `S${item.scope_no}` : '-'
                    const groupBadge = item.group_no !== null ? `G${item.group_no}` : '-'
                    const viewBadge = item.concurrent_view_no !== null ? `V${item.concurrent_view_no}` : '-'
                    const playBadge = item.concurrent_play_no !== null ? `P${item.concurrent_play_no}` : '-'
                    const selInfo = item.selection_no !== null ? item.selection_no : '-'
                    const selVal = item.selection_value !== null ? item.selection_value : '-'

                    return (
                      <tr 
                        key={idx} 
                        className={selectedItems.has(idx) ? 'selected' : ''}
                        onClick={(e) => {
                          if (e.target.type !== 'checkbox') {
                            toggleSelection(idx)
                          }
                        }}
                      >
                        <td className="cell-checkbox">
                          <input 
                            type="checkbox" 
                            checked={selectedItems.has(idx)}
                            onChange={() => toggleSelection(idx)}
                          />
                        </td>
                        <td className="cell-id">{item.content_id}</td>
                        <td className="cell-title" title={item.title}>{item.title}</td>
                        <td><span className="badge badge-type">{item.type_code}</span></td>
                        <td>{item.scope_no ? <span className="badge badge-scope">{scopeBadge}</span> : '-'}</td>
                        <td>{item.group_no !== null ? <span className="badge badge-group">{groupBadge}</span> : '-'}</td>
                        <td>{item.concurrent_view_no !== null ? <span className="badge badge-view">{viewBadge}</span> : '-'}</td>
                        <td>{item.concurrent_play_no !== null ? <span className="badge badge-play">{playBadge}</span> : '-'}</td>
                        <td>{item.selection_no !== null ? <span className="badge badge-sel">{selInfo}</span> : '-'}</td>
                        <td>{selVal}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="legend">
            <div className="legend-item"><div className="legend-dot" style={{background:'var(--scope-color)'}}></div> Scope</div>
            <div className="legend-item"><div className="legend-dot" style={{background:'var(--group-color)'}}></div> Group</div>
            <div className="legend-item"><div className="legend-dot" style={{background:'var(--view-color)'}}></div> C.View</div>
            <div className="legend-item"><div className="legend-dot" style={{background:'var(--play-color)'}}></div> C.Play</div>
            <div className="legend-item"><div className="legend-dot" style={{background:'var(--sel-color)'}}></div> Selection</div>
          </div>
        </div>

        <div className="panel right-panel">
          <div className="panel-header">
            <span>📊 구조 다이어그램</span>
            <button 
              className="btn" 
              style={{padding:'4px 10px', fontSize:'0.8rem'}} 
              onClick={() => refreshDiagram(currentContents)}
            >
              🔄 새로고침
            </button>
          </div>
          <div className="panel-body">
            <div ref={mermaidOutputRef}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScopeTest

