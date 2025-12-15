// 샘플 코스 데이터
export const sampleCourseData = {
  "course": {
    "id": 1,
    "code": "JSON_COURSE_1",
    "title": "샘플 코스"
  },
  "indexes_tree": [
    {
      "id": 1001,
      "parent_id": null,
      "title": "챕터 1",
      "type": "CHAPTER",
      "order": 1,
      "depth": 1,
      "prev_id": null,
      "next_id": 1002,
      "contents": [
        {
          "content_id": 2000,
          "code": "CNT_2000",
          "title": "비디오 소개0",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": null,
          "next_content_id": 2001
        },
        {
          "content_id": 2001,
          "code": "CNT_2001",
          "title": "비디오 소개1",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": 2000,
          "next_content_id": 2002
        },
        {
          "content_id": 2002,
          "code": "CNT_2002",
          "title": "비디오 소개2",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video2.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb2.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": 2001,
          "next_content_id": null
        }
      ],
      "children": []
    },
    {
      "id": 1002,
      "parent_id": null,
      "title": "챕터 2",
      "type": "CHAPTER",
      "order": 2,
      "depth": 1,
      "prev_id": 1001,
      "next_id": 1003,
      "contents": [
        {
          "content_id": 3000,
          "code": "CNT_3000",
          "title": "비디오 소개0",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": null,
          "next_content_id": 3001
        },
        {
          "content_id": 3001,
          "code": "CNT_3001",
          "title": "비디오 소개1",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": 3000,
          "next_content_id": 3002
        },
        {
          "content_id": 3002,
          "code": "CNT_3002",
          "title": "비디오 소개2",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video2.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb2.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": 3001,
          "next_content_id": null
        }
      ],
      "children": []
    },
    {
      "id": 1003,
      "parent_id": null,
      "title": "챕터 3",
      "type": "CHAPTER",
      "order": 3,
      "depth": 1,
      "prev_id": 1002,
      "next_id": null,
      "contents": [
        {
          "content_id": 4000,
          "code": "CNT_4000",
          "title": "비디오 소개0",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": null,
          "next_content_id": 4001
        },
        {
          "content_id": 4001,
          "code": "CNT_4001",
          "title": "비디오 소개1",
          "type_code": "VIDEO",
          "video": {
            "main_url": "https://cdn.example/video.mp4",
            "format": "mp4",
            "thumbnail_url": "https://cdn.example/thumb.jpg",
            "urls": []
          },
          "image": null,
          "quiz": null,
          "prev_content_id": 4000,
          "next_content_id": null
        }
      ],
      "children": []
    }
  ]
};

