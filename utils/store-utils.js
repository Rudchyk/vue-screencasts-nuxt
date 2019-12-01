export const getData = async function(url, axios) {
  let response = await axios.get(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const deserializeVideos = function(videos) {
  videos.forEach(v => {
    v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
    if(v.attributes.published_at) {
      v.attributes.published_at = new Date(v.attributes.published_at)
    }
  });
}

export const deserializeTags = function(tags) {
  tags.forEach(t => {
    t.attributes.id = t.id;
    t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
  })
}

export const deserializeCourses = function(courses) {
  courses.forEach(c => {
    c.attributes.id = c.id
    c.attributes.chapter_ids = c.relationships.chapters.data.map(c => c.id)
    c.attributes.video_ids = c.relationships.videos.data.map(v => v.id)
  })
}