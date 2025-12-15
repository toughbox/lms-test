/**
 * content_id로 콘텐츠를 찾는 함수
 * @param {Object} courseData - 코스 데이터 객체 (course와 indexes_tree 포함)
 * @param {number} contentId - 찾을 콘텐츠 ID
 * @returns {Object|null} - 찾은 콘텐츠 객체 또는 null
 */
export function findContentById(courseData, contentId) {
  if (!courseData || !courseData.indexes_tree) {
    return null;
  }

  // indexes_tree를 순회하며 모든 콘텐츠 검색
  for (const chapter of courseData.indexes_tree) {
    if (chapter.contents && Array.isArray(chapter.contents)) {
      const content = chapter.contents.find(
        (c) => c.content_id === contentId
      );
      if (content) {
        return content;
      }
    }

    // children이 있는 경우 재귀적으로 검색
    if (chapter.children && Array.isArray(chapter.children)) {
      const found = searchInChildren(chapter.children, contentId);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

/**
 * children 배열에서 콘텐츠를 재귀적으로 검색하는 헬퍼 함수
 * @param {Array} children - 자식 노드 배열
 * @param {number} contentId - 찾을 콘텐츠 ID
 * @returns {Object|null} - 찾은 콘텐츠 객체 또는 null
 */
function searchInChildren(children, contentId) {
  for (const child of children) {
    if (child.contents && Array.isArray(child.contents)) {
      const content = child.contents.find(
        (c) => c.content_id === contentId
      );
      if (content) {
        return content;
      }
    }

    if (child.children && Array.isArray(child.children)) {
      const found = searchInChildren(child.children, contentId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

/**
 * 현재 콘텐츠의 next_content_id를 사용하여 다음 콘텐츠를 찾는 함수
 * @param {Object} courseData - 코스 데이터 객체
 * @param {number} currentContentId - 현재 콘텐츠 ID
 * @returns {Object|null} - 다음 콘텐츠 객체 또는 null
 */
export function getNextContent(courseData, currentContentId) {
  // 현재 콘텐츠 찾기
  const currentContent = findContentById(courseData, currentContentId);
  
  if (!currentContent) {
    return null;
  }

  // next_content_id가 없으면 null 반환
  if (!currentContent.next_content_id) {
    return null;
  }

  // next_content_id로 다음 콘텐츠 찾기
  return findContentById(courseData, currentContent.next_content_id);
}

/**
 * 현재 콘텐츠의 prev_content_id를 사용하여 이전 콘텐츠를 찾는 함수
 * @param {Object} courseData - 코스 데이터 객체
 * @param {number} currentContentId - 현재 콘텐츠 ID
 * @returns {Object|null} - 이전 콘텐츠 객체 또는 null
 */
export function getPrevContent(courseData, currentContentId) {
  // 현재 콘텐츠 찾기
  const currentContent = findContentById(courseData, currentContentId);
  
  if (!currentContent) {
    return null;
  }

  // prev_content_id가 없으면 null 반환
  if (!currentContent.prev_content_id) {
    return null;
  }

  // prev_content_id로 이전 콘텐츠 찾기
  return findContentById(courseData, currentContent.prev_content_id);
}

/**
 * id로 챕터/섹션을 찾는 함수 (indexes_tree에서)
 * @param {Object} courseData - 코스 데이터 객체 (course와 indexes_tree 포함)
 * @param {number} chapterId - 찾을 챕터 ID
 * @returns {Object|null} - 찾은 챕터 객체 또는 null
 */
export function findChapterById(courseData, chapterId) {
  if (!courseData || !courseData.indexes_tree) {
    return null;
  }

  // indexes_tree를 순회하며 챕터 검색
  for (const chapter of courseData.indexes_tree) {
    if (chapter.id === chapterId) {
      return chapter;
    }

    // children이 있는 경우 재귀적으로 검색
    if (chapter.children && Array.isArray(chapter.children)) {
      const found = searchChapterInChildren(chapter.children, chapterId);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

/**
 * children 배열에서 챕터를 재귀적으로 검색하는 헬퍼 함수
 * @param {Array} children - 자식 노드 배열
 * @param {number} chapterId - 찾을 챕터 ID
 * @returns {Object|null} - 찾은 챕터 객체 또는 null
 */
function searchChapterInChildren(children, chapterId) {
  for (const child of children) {
    if (child.id === chapterId) {
      return child;
    }

    if (child.children && Array.isArray(child.children)) {
      const found = searchChapterInChildren(child.children, chapterId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

/**
 * 현재 챕터의 next_id를 사용하여 다음 챕터를 찾는 함수
 * @param {Object} courseData - 코스 데이터 객체
 * @param {number} currentChapterId - 현재 챕터 ID
 * @returns {Object|null} - 다음 챕터 객체 또는 null
 */
export function getNextChapter(courseData, currentChapterId) {
  // 현재 챕터 찾기
  const currentChapter = findChapterById(courseData, currentChapterId);
  
  if (!currentChapter) {
    return null;
  }

  // next_id가 없으면 null 반환
  if (!currentChapter.next_id) {
    return null;
  }

  // next_id로 다음 챕터 찾기
  return findChapterById(courseData, currentChapter.next_id);
}

/**
 * 현재 챕터의 prev_id를 사용하여 이전 챕터를 찾는 함수
 * @param {Object} courseData - 코스 데이터 객체
 * @param {number} currentChapterId - 현재 챕터 ID
 * @returns {Object|null} - 이전 챕터 객체 또는 null
 */
export function getPrevChapter(courseData, currentChapterId) {
  // 현재 챕터 찾기
  const currentChapter = findChapterById(courseData, currentChapterId);
  
  if (!currentChapter) {
    return null;
  }

  // prev_id가 없으면 null 반환
  if (!currentChapter.prev_id) {
    return null;
  }

  // prev_id로 이전 챕터 찾기
  return findChapterById(courseData, currentChapter.prev_id);
}

