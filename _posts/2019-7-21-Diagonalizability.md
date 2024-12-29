---
layout: post
title: (2019) Efficient Matrix Operations through Diagonalizability
mathjax: True
---

In this blog post, I'll talk about *diagonalizability*, what it is, and why it may be useful to diagonalize matrices (when they can be) to efficiently compute operations on matrices. I won't go into detail *when* a matrix is diagonalizable, but it will be briefly mentioned in an example. 

If $$ A $$ is similar to a diagonal matrix $$ D $$, then $$ A = QDQ^{-1} $$ for some invertible matrix $$ Q $$ and some diagonal matrix $$ D = \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} $$, and $$ A $$ is *diagonalizable*. Only square matrices $$ A \in \mathbb{M_{nxn}}$$ are (possibly) diagonalizable. The matrix $$ Q $$ has columns given by (distinct, linearly independent) eigenvectors of the linear transformation given by $$ A $$, and $$ D $$ is a diagonal matrix whose diagonal entries contain eigenvalues corresponding to the eigenvectors of the linear transformation given by $$ A $$. 

Being able to diagonalize matrices this way is useful, since it allows for easy and fast computation of functions of $$ A $$. 

For example, if we wanted to compute $$ A^2 $$, then the naive matrix multiplication algorithm will take $$ O(n^3) $$ time, and the best known algorithm is still $$ O(n^{2.3}) $$. However, if we know that $$ A $$ is diagonalizable, then we have:

$$ A^2 = QDQ^{-1}QDQ^{-1} \rightarrow{} A^2 = QD^2Q^{-1} $$

An induction on the power $$ k $$ we raise $$ A $$ to shows that in general $$A^k = QD^kQ^{-1} $$.

Next, we show that this makes our life easier, since  $$ D^k = \begin{bmatrix}  \lambda_1^k & 0 &… & 0 \\ 0 & \lambda_2^k & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n^k \end{bmatrix} $$.

First, let's consider $$ D^2 $$. We have $$D^2 = DD = \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} $$. 

In general, for a matrix product $$ C = AB $$ we have $$C_{ij} = \sum_{k=1}^{m} A_{ik}B_{kj}$$ - the $$(i,j) $$ entry of $$ C $$ is the dot product of the $$ i$$th row of $$ A $$ and the $$j$$th column of $$ B $$. Therefore, we have $$D^2_{i,j} = [0, …, \lambda_i, …][0, …, \lambda_j, …]^T$$ so if $$ i \neq j $$ then $$D^2_{ij} = 0$$, otherwise $$D^2_{ij} = \lambda_i^2 = \lambda_j^2 $$. 

Thus, we have $$ D^2 = \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2^2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n^2 \end{bmatrix} $$ and an inductive argument gives our above result for $$ D^k$$.

This drastically reduces the complexity of computing $$ A^k $$: instead of $$ \log(k) $$ matrix multiplications, taking $$ O(\log(k)n^{2.3}) $$ with a good algorithm, we have an $$O(n) $$ pass to exponentiate across the diagonal, followed by two matrix multiplications (the first matrix multiplication with the diagonal matrix is also more efficient, as the rows of $$ Q^{-1}$$ are just scaled), for a complexity of $$ O(n^{2.3}) $$ - and the latter complexity does not grow with $$k$$. 

We can actually make a similar argument for computing any function $$ f $$ with a matrix argument: $$ f(A) = Qf(D)Q^{-1} =Q \begin{bmatrix}  f(\lambda_1) & 0 &… & 0 \\ 0 & f(\lambda_2) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f(\lambda_n) \end{bmatrix}Q^{-1}$$, when $$ A $$ is diagonalizable.

To show why this is the case, let's consider the taylor series expansion of $$ f(x) $$, where $$ x \in \mathbb{R}$$, around $$ 0 $$ (we are assuming here that $$ f $$ is infinitely differentiable around $$ 0 $$):

$$ f(x) = f(0) + f'(0)(x) + \frac{1}{2}f''(0)x^2 + \frac{1}{3!}f'''(0)x^3 + … = \sum_{i=0}^{\infty}\frac{f^{(n)}(0)x^n}{n!}$$

To bring in the matrix, we can substitute $$ A $$ in place of $$ x $$, and sums now become matrix sums and products scale the matrix:

$$ f(A) = f(0)I_{n} + f'(0)(A) + \frac{1}{2}f''(0)A^2 + \frac{1}{3!}f'''(0)A^3 +  … $$

Next, since $$ A $$ is diagonalizable and $$ A = QDQ^{-1} $$, we can subsitute:

$$ f(A) = f(QDQ^{-1}) = f(0)I_{n} + f'(0)(QDQ^{-1}) + \frac{1}{2}f''(0)(QDQ^{-1})^2 + \frac{1}{3!}f'''(0)(QDQ^{-1})^3 +  …$$

Writing the above expression as a sum yields the following:

$$ f(A) = \sum_{i=0}^{\infty} \frac{f^i(0)(QDQ^{-1})^i}{i!} $$ 

The term $$ (QDQ^{-1})^i $$ should be familiar - we know from above that that is just $$ QD^iQ^{-1}$$. Thus, we're left with $$f(QDQ^{-1}) = \sum_{i=0}^{\infty} Q\frac{f^i(0)D^i}{i!}Q^{-1} = Q(\sum_{i=0}^{\infty} \frac{f^i(0)D^i}{i!})Q^{-1} $$.

But $$ f(D) = \sum_{i=0}^{\infty} \frac{f^i(0)D^i}{i!} $$, so $$ f(QDQ^{-1}) = Qf(D)Q^{-1}$$.

Next, all that's left to show is that $$ f(D) = \begin{bmatrix}  f(\lambda_1) & 0 &… & 0 \\ 0 & f(\lambda_2) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f(\lambda_n) \end{bmatrix} $$. We use a similar approach with the Taylor series expansion around $$ 0 $$:

$$ f(D) = f(0)I_{n} + f'(0)D + \frac{1}{2}f''(0)D^2 + \frac{1}{3!}f'''(0)D^3 + … $$

$$ = f(0) \begin{bmatrix}  1 & 0 &… & 0 \\ 0 & 1 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & 1 \end{bmatrix}  + f'(0)\begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} +   \frac{1}{2}f''(0)\begin{bmatrix}  \lambda_1^2 & 0 &… & 0 \\ 0 & \lambda_2^2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n^2 \end{bmatrix} +  ... $$



This is just a bunch of matrix scaling and summation, so let's move some things inside the matrices:

$$ \begin{bmatrix}  f(0) & 0 &… & 0 \\ 0 & f(0) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f(0) \end{bmatrix}  + \begin{bmatrix} f'(0) \lambda_1 & 0 &… & 0 \\ 0 & f'(0)\lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f'(0)\lambda_n \end{bmatrix} +   \begin{bmatrix}  \frac{1}{2}f''(0)\lambda_1^2 & 0 &… & 0 \\ 0 & \frac{1}{2}f''(0)\lambda_2^2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \frac{1}{2}f''(0)\lambda_n^2 \end{bmatrix} +  … $$



Now, adding up the matrices, we get:

$$ \begin{bmatrix} \sum_{i=0}^{\infty} \frac{f^i(0)\lambda_1^i}{i!}& 0 &… & 0 \\ 0 & \sum_{i=0}^{\infty}\frac{f^i(0)\lambda_2^i}{i!} & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \sum_{i=0}^{\infty}\frac{f^i(0)\lambda_n^i}{i!} \end{bmatrix}$$



But each nonzero term is the Taylor series expansion for the corresponding $$\lambda_i$$, so this is just

$$ f(D) = \begin{bmatrix}  f(\lambda_1) & 0 &… & 0 \\ 0 & f(\lambda_2) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f(\lambda_n) \end{bmatrix} $$, so the proof is complete.



This is useful since it allows us to compute functions over matrices much more easily, as we saw above with exponentiation. Consider for example $$ f(A) = \exp(A) $$. A valid notion of exponentiating matrices can be given by defining $$ \exp(A) $$ similar to $$ \exp(x), x \in \mathbb{R} $$:

$$ \exp(A) = A^0 + A^1 + \frac{A^2}{2} + \frac{A^3}{3!} + … = \sum_{i=0}^{\infty} \frac{A^i}{i!}$$

(As an aside, it turns out that the above sum is a much more natural way to think about the $$ \exp $$ function, instead of thinking of it as raising $$ e $$ to some power. Read [this fascinating Quora answer](https://www.quora.com/Is-it-just-a-coincidence-that-the-derivative-of-e-x-is-also-e-x-or-is-there-some-feature-in-the-function-due-to-which-this-happens/answer/Alon-Amit) to find out why.)

Clearly, computing matrix powers like this to approximate $$ \exp(A) $$ is very expensive. But if $$ A $$ is diagonalizable, we have a much less expensive approach to computing $$ \exp(A) $$: 

$$ \exp(A) = \exp(QDQ^{-1}) = Q\exp(D)Q^{-1} = Q \begin{bmatrix}  \exp(\lambda_1) & 0 &… & 0 \\ 0 & \exp(\lambda_2) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \exp(\lambda_n) \end{bmatrix}Q^{-1}$$



**An application: predicting the growth of a portfolio through solving linear differential equations**

Consider a simple portfolio given by dollars invested into two investments (say IBM stock and a money market fund). Then, this portfolio lives in a two-dimensional vector space $$P = \begin{bmatrix}  Stock  \\ Money Market \end{bmatrix}$$.

Assume further that we expect IBM stock to have a long-term growth rate of 3% (indeed an egregnious assumption for any individual stock), and to issue a 2% dividend every year. We also will assume that the money market fund will provide a consistent 2% return on investment. Let's say that we initially have $100 invested in IBM stock, and 500 invested in the money market fund.

With these assumptions, the growth of our portfolio every year can be given by a linear transformation $$ T $$ who's matrix is given by $$ A = [T(v_1), T(v_2)] $$ where $$ v_1 = (1,0), v_2 = (0,1)$$ are the standard basis vectors.

We have $$ T(v_1) = [1.03, 0.02]^T $$ since one dollar of stock returns 1.03 in the stock and 0.02 as a dividend, and $$ T(v_2)= [0, 1.02]^T $$ since one dollar in the money market fund does not return anything in the stock, and returns 1.02 in the fund.

Thus, the matrix of the linear transformation is given by $$ A = \begin{bmatrix} 1.03 & 0 \\ 0.02 & 1.02 \end{bmatrix}$$, and we can model the growth of our portfolio as a first-order linear differential equation:

$$ x'(t) = Ax(t) $$

If $$ A $$ were diagonalizable, we'd have a simple, exact solution, so we attempt to diagonalize $$ A $$. Since $$ A $$ is upper triangular, we have that the eigenvalues for $$ A $$ are its diagonal entries $$\lambda_1 = 1.0, \lambda_2 = 1.02$$. Since $$ A$$'s eigenvalues both have algebraic multiplicity one, they must have geometric multiplicity one, and thus $$ A $$ is diagonalizable.

We compute $$ ker(A - 1.03I_2) $$ and $$ ker(A - 1.02I_2)$$ to see that the eigenspace corresponding to $$\lambda_1 $$ and $$\lambda_2$$ are  $$E_{\lambda_1} = Span(0.5,1)$$ and $$E_{\lambda_2} = Span(0,1)$$, respectively.

Thus, we have $$ A = QDQ^{-1}$$ with $$ Q = \begin{bmatrix} 0.5 & 0 \\ 1 & 1 \end{bmatrix}, D =  \begin{bmatrix} 1.0 3& 0 \\ 0 & 1.0 2\end{bmatrix}$$, and $$x'(t) = QDQ^{-1}x(t)$$.

To simplify things, we can multiply both sides by $$Q^{-1}$$ to get $$(Q^{-1}x(t))' = DQ^{-1}x(t)$$. Now, we let $$ y(t) = Q^{-1}x(t)$$ so that $$ y'(t) = Dy(t)$$. Expanding this, we have 

$$ \begin{bmatrix} y_1'(t) \\ y_2'(t) \end{bmatrix} = \begin{bmatrix} 1.03 & 0 \\ 0 & 1.02 \end{bmatrix}\begin{bmatrix} y_1(t) \\ y_2(t) \end{bmatrix}$$ , and we get the uncoupled differential equations

$$ y_1'(t) = 1.03y_1(t)$$, $$ y_2'(t) = 1.0y2_2(t)$$ which we solve separately to get $$ y_1(t) = C_1e^{1.03t}, y_2(t) = C_2e^{1.02t}$$, for some constants $$C_1, C_2$$. Now, since $$ x(t) = Qy(t)$$, we recover $$x(t)$$ by applying $$ Q$$:

$$ x(t) = \begin{bmatrix} 0.5 & 0 \\ 1 & 1 \end{bmatrix} \begin{bmatrix} C_1e^{1.03t} \\ C_2e^{1.02t} \end{bmatrix}$$. Multiplying, we have that 

$$x_1(t) = \frac{1}{2}C_1e^{1.03t}$$ and $$ x_2(t) = C_1e^{1.03t} + C_2e^{1.02t}$$. Taking into account our initial conditions, we have that $$x_1(0) = \frac{1}{2}C_1 = 100$$ and $$ x_2(0) = C_1 + C_2 = 500$$ , so we have that $$C_1 = 200, C_2 = 300$$. Thus, our final solution is $$x_1(t) = 100e^{1.03t}$$ and $$ x_2(t) = 200e^{1.03t} + 300e^{1.02t}$$, in which we can plug in a value for $$ t $$ to estimate the value of our portfolio at that time.







































