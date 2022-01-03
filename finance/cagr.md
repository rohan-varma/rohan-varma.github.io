## Always Use CAGR Over Average Annual Return When Analzying Investments

This is a quick note to explain why one should always use the CAGR, or Compound Annual Growth Rate, over the average annual return when comparing two investments (such as mutual funds, savings accounts, portfolios, etc).

### Why is this an issue in the first place? 

Many actively managed mutual funds state their average annual return and neglect CAGR, or bury it deeply somewhere in the prospectus where it is unlikely to be read or considered. This practice can be deeply misguiding, especially to newer investors and end up costing these investors millions of dollars in the long term.

To illustrate the issue, let's take a quick example:

In Year 1, you start off investing $$ \$ 1000 $$ and by the end of the year, it grows 100% to $$ \$ 2000$$. 

In Year 2, the investment drops 50%, so you are left with $$ \$ 1000 $$. 

The average annual return is simply computed by taking the arithmetic mean of all returns. Therefore, an advisor quoting your average return would report it as 50%! 

Of course, as per your intuition, you did not actually get a 50% return, even though the average annual return paints it as so. It's easily to confuse this artificial 50% number with what you'd actually expect if your "return" was 50% for 2 years: $$ \$ 1500 $$ after the first year and $$ \$2250 $$ at the end of the 2nd year. Where is the mistake here? 

The issue is that year over year performance of investments are *highly correlated*, in that your investment performance in previous years will determine how your investments grow or contract in subsequent years. As a simple example, if you have $$ \$ 1000 $$, lose $$ 20 \% $$ in one year and end up with $$ \$ 800 $$, you would need a 25%, not a 20%, return just to break even in the next year. In such situations where compounding and correlation defines the entire game, **the average annual return is a useless figure**. (N.B.: This example is taken from [Source 1](https://investinganswers.com/articles/cagr-vs-average-annual-return-why-your-advisor-quoting-wrong-number).)

In this case, it is clear that your actual return is 0%. This is the CAGR. Formally, it can be computed by taking the product of all return percentages, taking the $$ n $$th root ($$ n $$ is the number of years here) and finally subtracting 1. 

CAGR is a much more useful proxy for investment performance as it reflects the compounding growth that would have taken place in order to get to your final investment value after $$ n $$ years. Of course, in reality, investments do not compound at a consistent rate, but CAGR allows you to understand the rate of compounding that allowed your investment to reach the value it did. To take another example, let's analyze the growth of the following investment:

Start: $$ \$ 1000 $$

Year 1: $$ \$ 1000 $$ 

Year 2:  $$ \$ 1000 $$  

Year 3: $$ \$ 1000 $$ 

Year 4: $$ \$ 1000 $$

Year 5: $$ \ $1610.51 $$

To compute the CAGR, we simply compute the product of all returns and subtract 1, giving us $$ 1.61^{\frac{1}{5}}-1 = 10 \%$$ . The CAGR of this investment is 10%, which means that if you put this $$ \$1000 $$ into a bank account at 10% interest, $$ \$1610.51 $$ is the amount you'd have after the end of 5 years. This investment is *exactly as if* the investment grew at a consistent 10% per year. One of the benefits of CAGR is being able to compute this standard value to compare how much investments have grown.

However, using the average annual return, you'd get $$ 12.2 \% $$, since the first 4 years have a return of $$ 0 $$ and the last year has a return of 61%. Note that if this were applied to the original 1000 and you assumed a 12.2% rate of growth, you'd actually end up with $$ \$ 1778.13 $$, which is more than what you actually ended up with. **This is one way how stating average annual returns can easily mislead investors**. *CAGR* *is what happens in real life*, while average annual return always equals or overstates the CAGR (see proof below). (N.B. This example is taken from [Source 2](https://thecollegeinvestor.com/919/average-annual-return-vs-compound-annual-return/).)

Another way how average annual return can mislead investors is because different funds that have performed vastly differently can have the same average annual return. For example, the above example has an average annual return of 12.2%. But an investment that grows 12.2% each year has an average annual return (and CAGR) equal to 12.2% as well, but this investment is worth more at the end of 5 years. Therefore, **it is impossible to distinguish investments based on average annual return**.

Hopefully I've convinced you that using average annual returns to analyze fund performance is inaccurate when considering what happens in real world scenarios where compounding plays a role. The average annual return *completely ignores compounding* and is this misleading. 

This is why folks like [Dave Ramsey](https://www.youtube.com/watch?v=0JHuHxwhKmc&feature=youtu.be) who insist that all you need to know is the average annual return are misguided in my opinion. Many folks (such as Ramsey) are rightfully advocates of extreme simplicity when it comes to investing, but advocating for using the average annual return instead of CAGR is an incorrect oversimplification.

### Mathematical Justification

CAGR versus average annual return boils down to the mathematical difference between an *arithmetic* mean and a *geometric* mean. 

*When should you use the arithmetic mean?* When you want to compute the mean of a sequence of events or set of data that is independent and uncorrelated, for example, the height of 30 students in a classroom.

*When should you use the geometric mean?* When you want to compute a mean of a sequence of events that are highly correlated, and influence or compound on each other in some way. Other than investment returns, other application includes population growth in species which is generally exponential in nature. 

The arithmetic mean is simply the mean we are all used to: $$ \frac{1}{n}\sum_{i=1}^{n}x_i $$ while the geometric mean is the $$ n $$ th root of the product of all $$ n $$ values: $$ (\Pi_{i=1}^{n}x_i)^{\frac{1}{n}}$$ .

We can now easily provide a proof for our claim above that the average annual return of an investment will always be overstated, i.e. greater than or equal to the CAGR. We must show that 

$$ (\Pi_{i=1}^{n} x_i)^{\frac{1}{n}} \leq  \frac{1}{n}\sum_{i=1}^{n}x_i $$

Taking logs on both sides, we have

$$ \log((\Pi_{i=1}^{n} x_i)^{\frac{1}{n}}) \leq  \log (\frac{1}{n}\sum_{i=1}^{n}x_i) $$

$$ \frac{1}{n}\sum_{i=1}^{n}\log(x_i) \leq \log(\frac{1}{n}\sum_{i=1}^{n}x_i) $$

We now invoke [Jensen's inequality](https://en.wikipedia.org/wiki/Jensen%27s_inequality) which states that the a convex transformation of averages is always less than the average of the convex transformation applied individually to the elements used to compute the average, that is,

$$ f(\mathbb{E}[X]) \leq \mathbb{E}[f(X)]$$ where $$ f $$ is convex. 

Now, we consider the direct corollary that implies that the opposite is true for a concave transformation. Since $$ \log $$ is concave, our result above holds. 

This means that the average annual return will always *overstate* the true return on your investment, hence explaining why active fund managers sometimes prefer to use this figure over others. 

### Recommendations and Takeaways

Due to the above reasoning, my recommendation is to never consider mutual funds that state average annual return and don't state CAGR (or bury it deeply somewhere you can't find it), if you end up considering actively managed mutual funds. If working with a financial advisor who emphasizes average annual return over CAGR without proper justification, consider hiring a new financial advisor. 



#### Sources

1. [investinganswers.com](https://investinganswers.com/articles/cagr-vs-average-annual-return-why-your-advisor-quoting-wrong-number)
2. [thecollegeinvestor.com](https://thecollegeinvestor.com/919/average-annual-return-vs-compound-annual-return/)
3. [investinganswers.com](https://investinganswers.com/dictionary/c/compound-annual-growth-rate-cagr)
4. [investopedia](https://www.investopedia.com/ask/answers/06/geometricmean.asp#:~:text=The%20geometric%20mean%20differs%20from,returns%20than%20the%20arithmetic%20mean.)

