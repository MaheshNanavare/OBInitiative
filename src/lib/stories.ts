import { getCollection, type CollectionEntry } from 'astro:content';

/** All stories, newest first. */
export async function getStories() {
  const stories = await getCollection('stories');
  return stories.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Stories live at the site root (e.g. /meet-and-know-muzeyi-ashraf/), matching the old WordPress permalinks. */
export const storyUrl = (story: CollectionEntry<'stories'>) => `/${story.id}/`;

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
