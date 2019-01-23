---
layout: post
title: PRML Chapter 1 Notes: Probability & Information Theory
mathjax: True
---

### Pattern Recognition and Machine Learning: Chapter 1

#### 1.2 Probability Theory

The **multivariate Guassian is given by** $$ N(x \vert{} \mu, \Sigma) = \frac{1}{(2\pi)^{D/2}}\frac{1}{\vert{} \Sigma \vert{}^{1/2}} \exp(-\frac{1}{2}(x - \mu)^T\Sigma^{-1}(x-\mu))$$

Where we have a $$D$$ dimensional vector $$x$$ of continuous variables, a $$D*D$$ covariance matrix where $$D_{ij} = cov(x_i, x_j)$$ , and $$\vert{} \Sigma \vert{}$$ denotes the determinant of the covariance matrix.



#### Example: Maximum Likelihood with Gaussian Distribution

Given $$x = (x_1 .. x_n)^T​$$ observations of a scalar with the IID assumptions, and we assume that each $$x_n​$$ is drawn from a Gaussian distribution with mean $$\mu​$$ and $$\sigma^2​$$, we can write down the likelihood:

$$p(x \vert{} \mu, \sigma^2) = \prod_{n=1}^{N} N(x \vert{} \mu, \sigma^2)$$

The log-likelihood can be given by $$\frac{-1}{2\sigma^2}\sum_{n=1}^{N}(x_n - \mu)^2 - \frac{N}{2}\ln(\sigma^2) - \frac{N}{2}\ln(2\pi)$$

Maximum likelihood gives us:

$$\hat{\mu} = \frac{1}{N}\sum_{n=1}^{N}x_n$$ and $$\hat{\sigma^2} = \frac{1}{N}\sum_{n=1}^{N}(x_n - \hat{\mu})^2$$ 

i.e., the typical values for the sample mean and (uncorrected) sample standard deviation. If we apply Bessel's correction and multiply the sample standard deviation by $$\frac{N}{N-1}$$ then we obtain an unbiased estimate for the standard deviation.

**Downsides of simple maximum likelihood estimation**

- We can show that while the mean obtained through this estimation is unbiased, the variance is a biased estimate of the true distribution variance.
  - *Biased* in this context means that $$E[\hat{\theta}] - \theta \neq{} 0$$
  - This further means that if you take a bunch of samples of $$x$$ (tending towards infinity) and predict $$\hat{\theta}$$ for each sample, then the difference between the average prediction and the actual parameter will be $$0$$. 
  - Practically, this doesn't say much since:
    - It doesn't make any statement about the difference of a single point estimate and the true parameter
    - In statistical learning, the underlying parameter is often unknown, so this quantity is impossible to compute.
    - But, it does provide some insight as to why model averaging and ensemble learning works well.
- We have $$E[\hat{\mu}] = E[\frac{1}{N}\sum_{n=1}^{N}x_n] = \frac{1}{N}\sum_{n=1}^{N}E[x_n] = \frac{1}{N}\sum_{n=1}^{N}\mu = \mu$$ 

