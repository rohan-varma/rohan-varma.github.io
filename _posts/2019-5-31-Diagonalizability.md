If $$ A $$ is similar to a diagonal matrix $$ D $$, then $$ A = QDQ{^-1} $$ for some invertible matrix $$ Q $$ and some diagonal matrix $$ D = \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} $$.

Being able to diagonalize matrices this way is useful, since it allows for easy and fast computation using $$ A $$. 

For example, if we wanted to compute $$ A^2 $$, then the naive matrix multiplication algorithm will take $$ O(n^3) $$ time, and the best known algorithm is still $$ O(n^{2.3}) $$. However, if we know that $$ A $$ is diagonalizable, then we have:

$$ A^2 = QDQ^{-1}QDQ^{-1} \rightarrow{} A^2 = QD^2Q^{-1} $$

By inducting on the power $$ k $$ we raise $$ A $$ to, we can show that in general $$A^k = QD^kQ^{-1} $$.

Next, we show that this makes our life easier, since  $$ D^k = \begin{bmatrix}  \lambda_1^k & 0 &… & 0 \\ 0 & \lambda_2^k & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n^k \end{bmatrix} $$.

First, let's consider $$ D^2 $$. We have $$D^2 = DD = \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} $$. In general, for a matrix product $$ C = AB $$ we have $$C_{ij} = \sum_{k=1}^{m} A_{ik}B_{kj}$$ - the $$(i,j) $$ entry of $$ C $$ is the dot product of the $$ i$$th row of $$ A $$ and the $$j$$th column of $$ B $$. Therefore, we have $$D^2_{i,j} = [0, …, \lambda_i, …][0, …, \lambda_j, …]^T$$ so if $$ i \neq j $$ then $$D^2_{ij} = 0$$, otherwise $$D^2_{ij} = \lambda_i^2 = \lambda_j^2 $$. 

Thus, we have $$ D^2 = \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2^2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n^2 \end{bmatrix} $$ and an inductive argument gives our above result for $$ D^k$$.

This drastically reduces the complexity of computing $$ A^k $$: instead of $$ k $$ matrix multiplications, taking $$ O(kn^{2.3}) $$ with a good algorithm, we have an $$O(n) $$ pass to exponentiate across the diagonal, followed by two matrix multiplications, for a complexity of $$ O(n^{2.3}) $$ - and the latter complexity does not grow linearly with $$k$$. 

We can actually make a similar argument for computing any function $$ f $$ with a matrix argument: $$ f(A) = Qf(D)Q^{-1} =Q \begin{bmatrix}  f(\lambda_1) & 0 &… & 0 \\ 0 & f(\lambda_2) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f(\lambda_n) \end{bmatrix}Q^{-1}$$, when $$ A $$ is diagonalizable.

To show why this is the case, let's consider the taylor series expansion of $$ f(x) $$, where $$ x \in \mathbb{R}$$, around $$ 0 $$:

$$ f(x) = f(0) + f'(0)(x) + \frac{1}{2}f''(0)x^2 + \frac{1}{3!}f'''(0)x^3 + … = \sum_{i=0}^{\infty}\frac{f^{(n)}(0)x^n}{n!}$$

To bring in the matrix, we can substitute $$ A $$ in place of $$ x $$, and sums now become matrix sums and products scale the matrix:





Next, since $$ A $$ is diagonalizable and $$ A = QDQ^{-1} $$, we can subsitute:



Writing the above expression as a sum yields the following:



The term $$ (QDQ^{-1})^n $$ should be familiar - we know from above that that is just $$ QD^nQ^{-1}$$. Thus, we're left with $$f(QDQ^{-1}) = …$$

But $$ f(D) = … $$, so $$ f(QDQ^{-1}) = Qf(D)Q^{-1}$$!

Next, all that's left to show is that $$ f(D) = \begin{bmatrix}  f(\lambda_1) & 0 &… & 0 \\ 0 & f(\lambda_2) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f(\lambda_n) \end{bmatrix} $$. We use a similar approach with the Taylor series expansion around $$ 0 $$:

This is just a bunch of matrix scaling and summation, so let's move some things inside the matrices:



Now, adding up the matrices, we get:



But this is just

$$ f(D) = \begin{bmatrix}  f(\lambda_1) & 0 &… & 0 \\ 0 & f(\lambda_2) & … & 0 \\ … & … & … & … \\ 0 & 0 & … & f(\lambda_n) \end{bmatrix} $$, so the proof is complete.



This is useful since it allows us to compute functions over matrices much more easily and quickly, as we saw above with exponentiation. Consider for example $$ f(A) = \exp(A) $$. Since we have a valid notion of exponentiating matrices, $$ \exp(A) $$ is defined similar to $$ \exp(x), x \in \mathbb{R} $$:



(As an aside, it turns out that the above sum is a much more natural way to think about the $$ \exp $$ function, instead of thinking of it as raising $$ e $$ to some power. Read [this fascinating Quora answer](https://www.quora.com/Is-it-just-a-coincidence-that-the-derivative-of-e-x-is-also-e-x-or-is-there-some-feature-in-the-function-due-to-which-this-happens/answer/Alon-Amit) to find out why.)





















