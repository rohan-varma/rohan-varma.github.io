#### Analyzing the Hessian to Aid Optimization of Deep Networks

Optimizing deep neural networks has long followed a general tried-and-true template. Generally, we randomly initialize our weights, which can be thought of as randomly picking a place on the "hill" which is the optimization landscape. There are some tricks we can do to achieve better initialization schemes, such as the He or Xavier initialization.

Then, we follow the gradient and update our parameters until we've met some stopping criterion. This is known as gradient descent. More commonly, stochastic gradient descent is used to add noise to the optimization process and speed up training time. Additionally, vanilla SGD is less common now, with practitioners instead opting for methods that add in momentum or adaptive learning rate techniques.

It's natural to question theoretical - and practical - aspects of this common technique. What guarantees does it provide, and what are some conditions in which it could fail? Here, I'll attempt to dissect some of these questions so we can better understand what to watch out for when optimizing deep networks.

##### Precursor: Convexity and the Hessian

Say we want to optimize $$ f(x) $$ where $$ x $$ are our parameters that we want to learn. The question of convexity arises. Is $$ f $$ convex, meaning that any local minimum we achieve is the optimal solution to our problem? Or is $$ f $$ nonconvex, in which case local minima can be larger than global minima? It turns out that the Hessian, or the matrix of $$ f$$'s second derivatives, can tell us a lot about this.

The Hessian is real and symmetric, since in general we assume that the second derivatives exist and  $$ \frac{dy}{dx_1 x_2} = \frac{dy}{dx_2 x_1}$$for the functions that we are considering (Schwarz's theorem provides the conditions that need to be true for this to hold). For example, the Hessian for a function $$ y = f(x_1, x_2)$$ could be expressed as

​									$$\begin{bmatrix} \frac{dy}{dx_1x_1} & \frac{dy}{dx_1x_2} \\ \frac{dy}{dx_2x_1} &  \frac{dy}{dx_2x_2}\end{bmatrix} $$ 

Real symmetric matrices have nice properties:

- All eigenvalues are real and distinct eigenvalues correspond to distinct eigenvectors

- The eigenvectors of distinct values are orthogonal, and therefore form a basis for $$ R^n $$ . 

  ​

Next, a *positive define* matrix is a symmetric matrix that has all positive eigenvalues. One way to determine if a function is *convex* is to check if its Hessian is positive definite.

To show this, it is enough to show that $$ z^T H z > 0 $$ for any real vector $$ z $$. To see why all positive eigenvalues imply this, first let's consider the case where $$ z $$ is an eigenvector of $$ H $$. Since $$ Hz = \lambda z $$ we have 

​						$$ z^T H z = z^T\lambda z = \lambda z^Tz = \lambda ||z||^2 > 0 $$	 since $$ \lambda > 0$$. 

To prove this for an arbitrary vector $$ z $$, we first note that we can diagonalize $$ H $$ as follows:

​								$$ z^T H z = z^T Q \Lambda Q^{-1}z $$

Where $$ Q $$ is a matrix whose columns are (distinct) eigenvectors of $$ H$$ and $\Lambda$ is a diagonal matrix with the corresponding eigenvalues on its diagonal.

As mentioned, the eigenvectors are orthogonal. Since $$ Q $$ is a matrix whose columns are the eigenvectors, $$ Q $$ is an orthogonal matrix, so we have $$ Q^{-1} = Q^T $$, giving us:

​								 $$ z^T Q \Lambda Q^Tz > 0$$

Let's define $$ s = Q^T z $$, so we now have $$ s^T  \Lambda s > 0 $$. Taking



​								 $$ s = \begin{bmatrix} s_1 \\ … \\ s_n \end{bmatrix}$$ 

and

​						 $$ \Lambda = \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} $$

We now have

​			 $$\begin{bmatrix} s_1 & … & s_n \end{bmatrix} \begin{bmatrix}  \lambda_1 & 0 &… & 0 \\ 0 & \lambda_2 & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda_n \end{bmatrix} \begin{bmatrix} s_1 \\ … \\ s_n \end{bmatrix} = \begin{bmatrix} s_1 & … & s_n \end{bmatrix} \begin{bmatrix} \lambda_1 s_1 \\ … \\ \lambda_ns_n \end{bmatrix} = \sum_{i=1}^{N}\lambda_is_i^2 > 0 $$.



Which is true since all the eigenvalues are positive.

As an example of using this analysis to prove the convexity of a machine learning problem, we can take the loss function of the (l2-regularized) SVM:

​					$$ L(w) = \lambda \sum_n w_n^2 + \sum_n \max (0, 1 - y_n(w^Tx_n))$$

The derivatives for each $$ w_n$$ are $$\frac{dL}{dw_n} = \lambda w_n  + \sum \textbf{1} (y_n w^T x_n < 1)(-y_nx_n)  $$

The second derivatives can be characterized as $$ \frac{dL}{dw_n w_k}, k != n$$ and  $$ \frac{dL}{dw_n^2}$$. The latter derivatives will appear as the diagonal entries of the Hessian.

For the first case, since our expression $$ \frac{dL}{dw_n}$$ is constant with respect to $$w_k$$ the derivative is simply $$ 0$$. For the second case, the derivative is simply $$\lambda$$. Therefore, our Hessian is the following diagonal matrix:

​							$$ \begin{bmatrix}  \lambda & 0 &… & 0 \\ 0 & \lambda & … & 0 \\ … & … & … & … \\ 0 & 0 & … & \lambda \end{bmatrix}$$

Since this is a diagonal matrix, the eigenvalues are simply the entries on the diagonal. Since the regularization constant $$ \lambda > 0$$, the Hessian is positive definite, therefore the above formulation of the hinge loss is a convex problem. We could have alternatively shown that $$ z^T H z > 0$$ as well, since $$ H z$$ simply scales $$ z $$ by a positive scalar.

##### Ok…But what about Neural Networks?

The optimization problem for neural networks are generally highly nonconvex, making optimizing deep neural networks much tougher. Fortunately, there are still some applications of the Hessian that we could use. 

###### Local Minima

First, it may be worth it to know if we are at a local minimum at any point during our optimization process. In some cases, if this occurs early in our training process or at a high value for our objective function, then we could consider restarting our training/initialization process or randomly update our objective to "kick" our parameters out of the bad local minima.

Even though the Hessian is not positive definte at any given point, we can check if we're at a local minimum by examining the Hessian. This is basically the second derivative test in single-variable calculus. If at a point $$ x_) $$ (which, in this context, is a particular setting of our weight parameters) has $$ \nabla f(x_0) = 0$$ and the Hessian $$ H $$ is positive definite at $$ x_0$$, then we can take the Taylor Series expansion at this point:

​					$$ f(x)\approx f(x_0) + (x-x_0)\nabla_xf(x_0) + \frac{1}{2}(x-x_0)^T\textbf{H}(x-x_0)$$

Considering an SGD update $$ x = x_0 - \epsilon u$$ and noting that $$\nabla_x f(x_0) = 0$$, we have

​					$$f(x_0-\epsilon u) \approx f(x_0) + \frac{1}{2}(x_0 - \epsilon u - x_0)^TH(x_0 - \epsilon u - x_0)$$

​					$$f(x_0-\epsilon u) \approx f(x_0) + \frac{1}{2}\epsilon^2 u^TH u $$

If the Hessian is positive definite at $$ x_0$$, then it tells us that any direction $$ u $$ in which we choose to travel will result an increased value of the objective function, so we are at a local minimum. We can similarly use the idea of negative definiteness to see if we are at a local maximum. 

**Are local minima really that big of a problem?**

Arguably, the goal of fitting deep neural networks may not be to reach the global minimum, as this could result in overfitting, but rather find an acceptable local minima that obains good performance on the test set. In [this paper](https://arxiv.org/pdf/1412.0233.pdf), the authors state that "while local minima are numerous, they are relatively easy to find, and they are all more or less equivalent in terms of performance on the test set". In the [Deep Learning Book](http://www.deeplearningbook.org/), Goodfellow et al. state the early convergence to a high value for the objective is generally *not* due to local minima, and this can be verified by plotting the norm of the gradient throughout the training process. The gradient at these supposed local minima exhibit healthy norms, indicating that the point is not actually a local minima. 

###### A Poorly Conditioned Hessian

There are some cases where the regular optimization process - a small step in the direction of the gradient - could actually fail, and increase the value of our objective function - couteractive to our goal. This happens due to the *curvature* of the local region of our objective function, and can be investigated with the Hessian as well. 





###### Saddle Points

Getting stuck at a *saddle point* is a very real issue for optimizing deep neural networks, and arguably a much more important issue than getting stuck at a local minima (see http://www.offconvex.org/2016/03/22/saddlepoints/). One explanation of this is that it's much more likely to arrive at a saddle point than a local minimum or maximum: the probability of a given point in an $$ n$$ dimensional optimization space is just $$ \frac{1}{2^n}$$. 


