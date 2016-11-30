---
layout: post
title: Complexity Analysis - Pseudo Polynomial Algorithms
---


Several algorithms in Computer Science may appear to be polynomial upon first glance, but can actually be shown to run slower than polynomial time. [Pseudo polynomial](https://en.wikipedia.org/wiki/Pseudo-polynomial_time) time algorithms fall into this category - the numeric values of the input themselves may indicate a polynomial runtime, but the size of the input actually yields an exponential time algorithm. An example of this is a dynamic programming solution to the [subset sum problem](https://en.wikipedia.org/wiki/Subset_sum_problem#Pseudo-polynomial_time_dynamic_programming_solution), which is an NP-complete problem. A similar class of algorithms, [quasi-polynomial algorithms](https://en.wikipedia.org/wiki/Time_complexity#Quasi-polynomial_time), also don't run as fast as polynomial time, but aren't slow enough to be exponential. An example of this is the [3SAT problem](http://www.cs.umd.edu/~gasarch/TOPICS/sat/SATtalk.pdf), which is an NP-hard problem. 

Confusion in the analysis of such algorithms may arise when one considers the numeric value of the input as opposed to the actual size of the input. As an example, let's consider a simple algorithm to check if a number is prime: 

```cpp
bool is_prime(int n){
  if(n<2) return false;
  if(n==2) return true;
  for(int i = 3; i < sqrt(n); i++){
    if((n % i)==0){
      return false;
    }
  }
  return true;
}
```

This algorithm runs in time *&#920;	(n)*, where n is the **numeric** value of the input, so the algorithm does run in polynomial time in *n*. However, it does *not* run in polynomial time in the **size** of the input - an important distinction, as we generally consider the size of the input (as opposed to the numeric value) when analyzing the complexity of algorithms. 

Formally, the size of the input into our algorithm is defined as the number of bits required to represent the input. For example, if our input was an array with *n* 32-bit integer elements, the size of our input would be *32n*, the number of bits required to represent it - and when analyzing complexity in terms of upper/lower/tight bounds, constants are generally foregone - hence the typical *O(n log n)* runtime of sorting algorithms such as merge sort. 

In the case of our ```is_prime``` algorithm, however, how many bits are required to represent the input? If you've played around with bits before, you may know that the answer is on the order of *log n*. Let's verify this mathematically. 

First, we write n in terms of its bit representation:

![n in terms of bits](http://latex2png.com/output//latex_2fbbd9a4d623f86d1d0bb98d79bd4637.png)

Since it would be reduntant to have leading zeros in our bit representation, we fix  ![theta k](http://latex2png.com/output//latex_b25b05e08da9fc184eeba4d6b22f5e49.png)  as 1 and all other &#952; as either *0* or *1*, depending on whether that particular bit is set or not. 

We notice that the number of bits needed to represent our input will be *k + 1*, since *k* is zero-indexed. For example, the decimal number *4* in binary is represented as *100*, and we have *k = 2* if we plug in *4* to our above formula. 

Now, we can obtain an upper bound for the number of bits needed to represent *n*. As mentioned, all &#952; in our above formula are either *0* or *1*. Therefore, we'd have a maximum value on the right hand side when all &#952; are *1*. We have: 

![n less or equal](http://latex2png.com/output//latex_ec30b43128ffebc4d2fa0b8daa9c380c.png)

This is a geometric series with a convergent sum, so we simplify:

![next step](http://latex2png.com/output//latex_85e5985cd378888efd296f84789fb704.png)

Solving for *log(n)*, we obtain:

![second last upper bound](http://latex2png.com/output//latex_dbf8cce918a64f3480483b5a83d3d00c.png)

Or, equivalently:

![last upper bound](http://latex2png.com/output//latex_4684f485a4efdd0b2add0dbeecdc4a85.png)

Now that we've established an upper bound for the number of bits needed to represent *k*, we can also establish a lower bound. Consider the sum of our initial series when all &#952; for *i < k* are zero:

![lower bound](http://latex2png.com/output//latex_b9276521c53fbac25980f2564d585612.png)

Let's rewrite our upper and lower bounds in terms of *log(n) + 1*, which will prove to be convenient:

![comparison upper bound](http://latex2png.com/output//latex_9d10fa5453c35b0827f1692264d15914.png)

![comparison lower](http://latex2png.com/output//latex_d75ba7b03e9ea0411ec1796f2f1f8c7a.png)

Then we can put the inequalities together:

![put together](http://latex2png.com/output//latex_d5604c76df2660fbfd7c9b648c96b3e7.png)

As mentioned above, we let *s* denote the number of bits needed to represent our input. Then *s = k + 1*:

![using s](http://latex2png.com/output//latex_85661774828061a246eebe6615cce03b.png)

If you're familiar with big-O/Theta/Omega notation, we can write an upper and lower bound for our number of bits using big-O and big-Omega notation: 

![big o s](http://latex2png.com/output//latex_02c30cf244355bd4b7b8a97ad20229e1.png)

![big omega](http://latex2png.com/output//latex_6a7e5d6b644d3160dc0e0f6d3cb978ec.png)

Therefore, a tight bound for the number of bits, as expected, is:

![tight bound](http://latex2png.com/output//latex_c4c4cabdb7a39d060915bfac899c2217.png)

Going back to our naive prime number checking algorithm, we initially obtained a polynomial runtime when considering the *numeric* value of our input:

![prime runtime](http://latex2png.com/output//latex_159e01b7064f73e05f6499810adf0c2a.png)

However, we now have an upper bound for the number of bits: 

![s less log n](http://latex2png.com/output//latex_58f9ffe8cd88a8c3e4ff6b34c50e83e4.png)

So we can solve for *n* in terms of *s* to get our algorithm's complexity with respect to the size of our input, or the number of bits needed to represent it. We obtain a lower bound for *n*:

![n in terms of s](http://latex2png.com/output//latex_960fdafc81c30bfad374ba287ad82e6d.png)

Therefore, our prime-number checking algorithm is actually *exponential* with respect to the input size:

![exponential lower bound](http://latex2png.com/output//latex_34b5487eeb2181a704cf887f921a2a27.png)


If you're interested in faster prime checking algorithms, the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) is a good place to start.  


Pseudo polynomial time algorithms often arise in dynamic programming solutions to NP-complete problems. One of the many variations of the subset sum problem is given a set of size *N* and a target sum *t*, check if any subset of the set sums to the target sum. A naive implementation could enumerate and then sum all possible *2^n* sets, taking time *O(n 2^n)*. However, a dynamic programming solution exists. 

```cpp
bool subset_sum(const vector<int> &s, int target){
///top down approach: dp[i][j]=1 if there is a subset of the array indexed from 0 to j with sum i. 
int dp[target+1][s.size()+1];
//base case values
for(int i = 0; i < s.size() + 1; i++){
  dp[0][i] = 1; //zero sum can always be made with the empty set
  }
for(int i = 1; i < target + 1; i++){
  dp[i][0] = 0; //non zero sum cannot be made w/null subsets
  }
for(int i = 1; i < target + 1; i++){
  for(int j = 1; j < s.size() + 1; j++){
    //for the array from 0 to j, if we know there's a sum using only j - 1 indices use that, otherwise see if we can make a sum by decrementing i by the value at the j-1th index.
    dp[i][j] = dp[i][j-1] || ((i>=s[j-1]) ? dp[ i - s[j-1]][j-1] : 0);
  }
  return dp[target][s.size()];
}
}
```

A quick analysis of this code may give a runtime of *O(Nt)*, which appears to be polynomial. However, it is indeed pseudo-polynomial: *t* is numeric, and doesn't represent the size of the *target* variable. The complexity of this algorithm with respect to the size of the input can be described as *O(N2^s)*, where *s* is the number of bits in the target variable. Therefore, it's an exponential algorithm - and no polynomial time algorithm is known.
