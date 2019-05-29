---
layout: post
title: A Note on Computer Science Education
mathjax: True
---

Note: I wrote this essay a couple months ago, but didn't quite get around to publishing it until now. It's my current (as of May 2019) view on university-level computer science education, mostly specific to UCLA.

Since I’ve been at UCLA, and especially recently, a debate has always been going on about UCLA’s CS curriculum. The debate is about theory vs practice: is UCLA’s CS curriculum too theoretical, and does it fail to teach students practical skills and prepare them for industry success? From my personal observations and limited sample size, it seems that a popular opinion is *yes*: UCLA’s curriculum should be changed to include more practical classes, where students learn skills that they will apply in industry roles, and to this end, there have been proposals to teach classes ranging from web application design to Android and iOS programming.

I’m going to present what may be an unpopular opinion: UCLA’s curriculum, as of this writing, is not too theoretical, and while several improvements could be made, it actually provides a good balance of both theory-based and practical knowledge.

First, I would posit that UCLA’s curriculum already has a healthy balance of both theory and practice. Lower-division classes and many upper division ones, such as CS 111, 131, and several electives, are already quite programming intensive. 

Many of these classes do indeed feature languages that are somewhat “unpopular” today, such as C, Lisp, or OCaml — languages that most software engineers would not use in their day to day jobs. However, it’s important to not dismiss these classes as “not practical” since they don’t teach the more popular languages (JavaScript, Python, etc) that are more commonly used in industry today. It’s unreasonable for a university to regularly tailor their curriculum to reflect languages in trends in the industry, where things change extremely quickly. 

Instead, universities can better serve their students by educating them on fundamentals of their field, concepts that have repeatedly shown up in some form over the last ~60 years (for Computer Science specifically). On top of teaching the theoretical foundations of these concepts, practical components (such as programming projects) can enforce these concepts. Since many modern computing ideas have their roots in languages such as C and Lisp, it makes sense to introduce fundamental concepts in these languages. And although many classes at UCLA need fixing, I believe that this is in general what the curriculum seeks to do.

As a case study, let’s consider a software engineer who starting working in the year 1990. If her education focused on learning the technological trends of the time, she would have been educated in things such as BASIC, COBOL, and writing desktop-based applications (forgive my nonexistent knowledge about 1990s software engineering). Today, thirty years later, this engineer would have seen the explosion of the internet and network-based applications, the rise and fall of the dot com bubble, the rapid advancement of mobile technology, the proliferation of cloud-based services, highly scaled distributed systems, and the rise of machine learning and AI.

Would this engineer have been able to better adapt to these trends given an education in what was hot at the time (late 1980s) or the fundamentals of CS? This question is somewhat loaded. And obviously, learning is lifelong, so this engineer would have had the chance to pick up these new skills. However, given all other things equal, I think it’s reasonable to claim that the engineer would have been better equipped to handle these changes given the latter education. Having fundamental building blocks would allow such an engineer to understand new concepts by going back to the basics (a technique that both Richard Feynman and Naval Ravikant are fond of), instead of re-learning new technologies from scratch every five or so years.

The crux of the matter is that UCLA shouldn’t teach you JavaScript or React: it should teach you the principles and thinking that goes into building these languages and frameworks in the first place. Which it does. For example, CS 131 dives deeply into the theory of programming languages, covering topics such as asynchronous control flow and functional programming theory such as the idea of closures, which is central to JavaScript. 

And one of the main selling points of React (arguably) is its fast diff algorithm. React needs to compute a set of differences between two component trees, and instead of using a O(n³) algorithm to do this, it uses heuristics to do the job in O(n). Classes teach the fundamentals of these concepts (trees, algorithmic complexity, heuristics) and students are given ample opportunity to apply these in practice through class projects, research, clubs, and personal projects. Experimentation is one of the best ways to learn, and clubs such as UCLA ACM do a great job at getting a group of like-minded individuals together and helping them learn new things.

Computer science and software engineering is a field where one has to continuously learn and adapt to changing trends. A good goal of university education seems like it should be to prepare students for this endeavor.

If university education succeeds at this, it’ll succeed at developing individuals who are not only trained to succeed in today’s workforce, but serve as leaders, solve new problems, and advance the state of the art.
