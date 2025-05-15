import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Newscard from '../components/newscard'
import { prisma } from '@/lib/db'
import { getExcerptFromContent, getFirstImageFromContent } from '@/lib/editorjs-parser'


// This must be a Server Component to directly use Prisma
export default async function NewsContent() {
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
        author: post.author || 'Lumbini Lions'
    }));

    // Featured post is the most recent one
    const featuredPost = newsItems[0];

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
    const displayFeatured = featuredPost || fallbackNews[0];
    // const excerpt = getExcerptFromContent(displayFeatured.content, 150) || displayFeatured.subtitle || ''
    return (
        <div className="overflow-x-hidden w-full"> 
                    {/* <FeaturedNewsClient displayFeatured={displayFeatured} ExcerptFromContent='excerpt'/> */}
                        {/* <MergedFeaturedNews displayFeatured={displayFeatured} ExcerptFromContent={excerpt}/> */}
                        <div className="flex justify-center h-full w-full min-h-screen z-[10] pt-40 md:pt-10 pt-[-10px] overflow-hidden relative">
                            {/* Background container with correct positioning */}
                {/* Background container that spans full width */}
                <div className='absolute top-0 left-0 right-0 w-screen -z-10 '>
                <div className='relative w-full'>
                    <h1 className="text-3xl absolute top-15 left-10 md:left-54 md:text-5xl font-['poppins'] z-10 text-white">
                    LATEST NEWS
                    </h1>
                    <Link href="/news">
                    <h1 className="text-1xl absolute top-30 left-10 md:left-54 opacity-70 md:text-[15px] font-['poppins'] z-10 text-white">
                    View all news
                    </h1>
                    </Link>
                    <div className="w-full h-[500px] relative">

                    <Image
                        src="/unnamed.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        quality={100}
                        priority
                    /> 
                     </div>
                </div>
                </div> 
            
            {/* News grid positioned to overlay the background */}
            <div className="relative z-20 mx-auto max-w-6xl mt-[194px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {/* {displayNews.slice(1).map(news => ( */}
                    {displayNews.map(news => (
                        <Newscard key={news.id} news={news} />
                    ))}
                </div>
                
                {/* Load More Button */}
                <div className="text-center mt-10">
                    <Link 
                        href="/news"
                        className="bg-neutral-800 hover:bg-neutral-700 text-white text-xl font-[poppins] px-8 py-3 rounded-lg transition-colors inline-block"
                    >
                        VIEW ALL NEWS
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );}