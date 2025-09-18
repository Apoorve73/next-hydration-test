import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface LessonContent {
  slug: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  tags: string[];
  content: MDXRemoteSerializeResult;
}

const contentDirectory = path.join(process.cwd(), 'content');

export async function getLessonBySlug(slug: string): Promise<LessonContent | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });

    return {
      slug,
      title: data.title || 'Untitled Lesson',
      description: data.description || '',
      duration: data.duration || '10 min',
      difficulty: data.difficulty || 'Beginner',
      tags: data.tags || [],
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Error loading lesson ${slug}:`, error);
    return null;
  }
}

export function getAllLessonSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(name => name.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}
