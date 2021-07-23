What are the odds? Comparing joint and conditional probabilities
In Chapter 7 of NN Taleb's book, The Black Swan, Taleb makes several arguments regarding how we humans perceive the likelihood of unlikely scenarios, given causal information about them. His line of reasoning revolves around the idea that causes/explanations of events increase the "mental availability" of certain unlikely scenarios happening, and therefore we assign these unlikely events higher odds of happening. He provides several examples to back up this claim, some of which I discuss below.
First, consider two scenarios - 1) a massive flood happening and killing 1000 people, and (2) an earthquake causing a massive flood which kills 1000 people. When researchers (Daniel Kahneman and Amos Tversky) requested a group of people to rank the probabilities of the above two events happening, people overwhelmingly ranked the probability of the second event happening higher than the probability of the first event happening.
This is an example of the conjunction fallacy, in which we mistakenly believe that a conjunction of two events (basically an event AND another event) is more probable than any of the single events happening on their own. This is impossible, due to the concept of marginalization in probability:
With respect to the above example, this means that the probability of a disastrous flood is greater than the probability of a disastrous flood, AND that flood being triggered by an earthquake. Being more plausible than the former, the latter event is mistaken to also be more probable, an easy, yet incorrect jump to make.
Taleb presents another interesting, albeit confusing example next. He poses the following two situations:
There is someone named John who is happily married. He killed his wife.
There is someone named John who is happily married. He killed his wife for her inheritance.

Again, the same question - which of these two scenarios is more probable? Taleb again asserts that is a logical error to believe that the second is more probable than the first, since the first one is obviously a superset of the second. However, there's an important distinction to be made here: the difference between conditional and joint probabilities.
Joint probabilities quantify how likely these events to happen in conjunction with each other, while conditional probabilities specify how likely is one event to happen, given that another event has already occurred.
If we're only looking at joint probabilities, then there are three events in the first case and four events in the second case:
Here we define J = John, HM = happily married, KW = killed wife, and some specific i captures the "wanted her inheritance" reason, and the other i's embody other reasons.
However, when we ask about probability, we tend do to so unclearly - just asking "what is more likely" is not enough. Taleb's phrasing in The Black Swan can easily mislead readers. A reasonable interpretation of the two scenarios in the above example is with conditional probabilities:
compared to
where I indicates the event that John wanted his wife's inheritance.
Using the assumption that a person being named John does not influence the likelihood of him killing his wife, we can rewrite the above probabilities:
and
It's reasonable to believe that the second probability could be greater than the first - wanting an inheritance could influence an otherwise happily married person to kill his wife (it is also important to recognize that this does not necessarily mean that the second quantity is greater than the first, for example it would not be greater if John's wanting of his wife's inheritance did not influence his desire to kill at all). This is the crux of Bayes rule - we use observed evidence to update our posterior beliefs (in this case the probability of John killing his wife).
All of this is just an attempt to illustrate an issue that I take with Taleb's reasoning - confusing the reader about joint probabilities and conditional probabilities. In general, there are two interpretations of probabilities of events:
Frequentist interpretation - how likely are these events to happen given some large sample - i.e. the probability is proportional to the number of times that the event occurred in a very large number of trials.
Bayesian interpretation - how likely are these events to happen, given some observed evidence and some prior belief about base rates pertaining to these events.

Understanding flawed mental models such as the conjunction fallacy is important, but we often miscommunicate our message since we aren't clear if we are discussing conditional events or joint events. Humans tend to employ a version of Bayesian reasoning, which I think partially explains why we commit fallacies such as the conjunction fallacy - we tend to think of evidence and our prior beliefs when gauging the likelihood of events.
However, Taleb does make another powerful point. Humans tend to add details to events in retrospect in order to make them more easily digestible and explainable. In reality, the stories that make the most sense and are easiest to accept aren't necessarily the most probable, and we must be wary about this when reasoning about the past.
Sources
The Black Swan
https://www.fs.blog/2016/09/bias-conjunction-fallacy/
https://www.eecs.qmul.ac.uk/~norman/BBNs/Fallacies_associated_with_causal_and_diagnostic_reasoning.htm

Thanks to Austin Lee for reading a draft of this post.