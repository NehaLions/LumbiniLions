import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Newscard1 from '../components/newscard1'
import { prisma } from '@/lib/db'
import { getExcerptFromContent, getFirstImageFromContent } from '@/lib/editorjs-parser'

import MergedFeaturedNews from '../components/MergedFeaturedNews'

export const revalidate = 86400; // 24 hours

// This must be a Server Component to directly use Prisma
export default async function NewsContent1() {
    // Fetch blog posts from database
    const blogPosts = await prisma.blogPost.findMany({
        orderBy: {
            publishedAt: 'desc',
        },
        take: 6,
    });
    // Transform database posts to match the news format expected by Newscard
    const newsItems = blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        image: post.imageUrl || getFirstImageFromContent(post.content) || '/news.jpg',
        content: post.content,
        date: new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        // author: post.author || 'Lumbini Lions'
        author: 'Lumbini Lions',
        isFeatured : post.isFeatured,
    }));

    // Featured post is the most recent one
    // Find the first post marked as featured, or default to the most recent one if none are featured
    const featuredPost = newsItems.find(item => item.isFeatured === true) ;

    // Fallback news array in case database is empty
    const fallbackNews = [
        {
            id: 1,
            title: "Lumbini Lions Sign Star Batsman Rajesh Kumar",
            subtitle: "The 28-year-old joins from Chitwan Rhinos on a two-year deal",
            image: "/news2.webp",
            date: "April 15, 2023",
            content: "The Lumbini Lions have completed the signing of star batsman Rajesh Kumar from rivals Chitwan Rhinos for an undisclosed fee. Kumar, who scored 412 runs in last season's tournament, has signed a two-year contract with the Lions. This acquisition is expected to significantly strengthen the Lions' batting lineup for the upcoming season."
        },
        // ... your other fallback news items
    ];

    // Use database posts if available, otherwise use fallback
    const displayNews = newsItems.length > 0 ? newsItems : fallbackNews;
    // const displayFeatured = featuredPost || fallbackNews[0];
    const displayFeatured = featuredPost || fallbackNews;
    const excerpt = getExcerptFromContent(displayFeatured.content, 150) || displayFeatured.subtitle || ''
    return (
        <div className=" overflow-x-hidden w-full"> 
                    {/* <FeaturedNewsClient displayFeatured={displayFeatured} ExcerptFromContent='excerpt'/> */}
                        <MergedFeaturedNews displayFeatured={displayFeatured} ExcerptFromContent={excerpt}/>
                        <div className="flex justify-center h-full w-full min-h-screen z-[10] pt-0 md:pt-10  overflow-hidden relative">
                            {/* Background container with correct positioning */}
                {/* Background container that spans full width */}
                {/* <div className='absolute top-0 left-0 right-0 w-screen -z-10 pointer-events-none'>
                <div className='relative w-full'>
                    <h1 className="text-3xl absolute top-15 left-10 md:left-54 md:text-5xl font-['poppins'] z-10 text-white">
                    LATEST NEWS
                    </h1>
                    <h1 className="text-1xl absolute top-30 left-10 md:left-54 opacity-70 md:text-[15px] font-['poppins'] z-10 text-white">
                    View all news
                    </h1>
                    <div className="w-full h-[500px] relative">

                    {/* <Image
                        src="/bluetemple.webp"
                        alt="Background"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        quality={100}
                        priority
                    /> 
                     </div>
                </div>
                </div> */} 
            
            {/* News grid positioned to overlay the background */}
            <div className="relative z-20 mx-auto max-w-6xl mt-[120px] md:mt-[4vh]">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols- ">
                    {/* {displayNews.slice(1).map(news => ( */}
                    {displayNews.map(news => (
                        <Newscard1 key={news.id} news={news} />
                    ))}
                </div>
            </div>
<div className="absolute left-[-300px] top-1/2 transform -translate-y-1/2 w-[700px] h-[800px] z-[10] hidden md:block">
  <Image 
    src="/lionsshield.webp"
    alt="Lion Shield"
    fill
    className="object-contain opacity-30"
  />
</div>
        </div>
        </div>
    );}