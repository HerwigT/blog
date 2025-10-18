---
layout: ../../layouts/BlogPostLayout.astro
title: 'Learning Astro and Tailwind by Building My Own Website'
author: 'Herwig'
pubDate: 2025-10-18
description: 'A personal account of how I built my portfolio/blog site using Astro, Tailwind CSS, and GitHub Pages - and what I learned along the way.'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["astro", "tailwindcss", "building"]
---
After spending some time contemplating what I want to learn next, I finally decided to build my own portfolio/blog site using Astro and Tailwind CSS.

In this post, I'll walk through my motivation, the tools I used, and what I learned along the way.

# Why I Built This Site

Recently, I have been exploring a lot of new topics in various domains like AI, cybersecurity and quantum computing.
This blog should help document this journey while potentially including one or the other educational post to help others.

Initially I thought about posting on one of the popular blogging sites, but then I came across Astro.
Going through their documentation I discovered a [tutorial](https://docs.astro.build/en/tutorial/0-introduction/) allowing me to learn Astro's key features while setting the foundation for this website.

# Tech Stack

The main technologies used for this site are [Astro](https://astro.build/) as the web framework, [Tailwind CSS](https://tailwindcss.com/) for styling and [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) as a hosting service for the resulting static website. 

## Astro

Getting a project started with Astro is straightforward (`npm create astro@latest`) and the documentation is beginner friendly.
Following the tutorial allowed me to quickly deploy a first version of my [portfolio/bloggin website](https://teufer.dev).
What really sold me on Astro are the component centered design and that it has built-in Markdown support.

Also, as a newbie in web development the fact that Astro focuses mostly on HTML, CSS and plain JavaScript is a big plus.
Diving into the variety of complex JS frameworks like React, Vue, or Svelte is a topic for further down the path but not out of reach since Astro supports the use of these frameworks if desired. 

## Tailwind CSS

I first discovered Tailwind CSS while following tech news and decided to give it a try for this project.
With my (limited) CSS background, it felt strange at first to write styles directly in HTML.
After some playing around I learned to enjoy the approach of styling all elements directly where they are defined.

Tailwinds approach to utility classes like `mt-4` (add top margin), `border-amber-200` (light amber border color) combined with its excellent documentation, make styling surprisingly enjoyable.

Adding dark mode support was also a breeze - prefixing a class with `dark:` applies styles only when dark mode is active on the operating system.

## GitHub Pages

Deploying static websites today is easier than ever - and often free.
While platforms like Vercel or Netlify are popular choices, I decided to use GitHub Pages since my code was already hosted there for version control.

Astro provides a ready-to-use GitHub Actions template for automatic deployment on each commit, allowing me to not worry about the deployment at all.

And as a nice bonus, GitHub Pages supports custom domains!

# Challenges & Lessons Learned

Like with any new tool, the hardest part was figuring out where to look for answers. I spent a good chunk of time hopping between docs, examples, and community posts before things started to click.

The great thing about Astro and Tailwind is how supportive their communities are - it never feels like you’re learning alone.

And now, even as a newcomer, I’ve managed to create a website that feels genuinely mine. 

# What's Next

Now that the site is functional, I’d like to refine the design a bit - especially the blog feed and the lists on the home and about pages.

Of course, I also plan to keep learning and sharing new insights as I explore the ever-evolving world of technology.

*Building this site has been a great reminder that learning by doing is the best way forward - and I’m excited to see where the next project takes me.*
