---
layout: post
title: A simple introduction to Feed Forward and Backpropagation
---
![Inputs into a neuron and its output.](http://deeplearning.stanford.edu/wiki/images/thumb/8/85/STL_Logistic_Classifier.png/380px-STL_Logistic_Classifier.png "Inputs into a neuron and its output.")

In this post, we'll walk through some intuition for the feed forward and backpropagation steps of training a neural network. We'll use a simple neural network model with real numbers to see exactly what's going on. Some calculus and a bit of linear algebra background is all that's needed to get started. 

### A Super-Simple Neural Network

Consider a neural network with three layers: an input layer, a hidden layer, and an output layer. The input layer will be composed of two units plus one bias unit, and it'll be connected to a hidden layer of two units plus one bias unit as well. The hidden layer connects to an output layer of two units. While neural networks can have thousands of units (and not necessarily the same amount of units per layer), we'll keep ours small for our purposes. Here's our neural network, with dummy values for the inputs, weights, and output labels. Given inputs of 0.18 and 0.31, we want our neural network to output 0.23 and 0.76. 

The overarching goal of neural networks is to learn the values of a set of weights that allow output to be accurately predicted from a given input. This is done by taking our inputs and feeding them forward through the neural network, where they are multiplied by weights (which are initially initialized randomly). Our output units represent the predictions made (for example, the probability that our input belongs to a certain class). At first, these predictions are inaccurate since the weights were initialized randomly. However, we can quantify our error and recompute our weights to reduce it. A popular technique in neural network implementations to minimize our errors is called backpropagation. Let's take a look at how the forward pass of our data through the network looks: 

### The Forward Pass

Then, let's apply our weights to the inputs. Looking at our diagram above, each input has a corresponding weight that contributes to our input values into the hidden layer. From our diagram, let's calculate the inputs into the hidden layer individually:

input h1 = w1i1 + w3i2 + 1b = NUM
input h2 = w2i1 + w4i2 + 1b = NUM

We essentially just took a *linear combination* of our values in the input layer. That's all there is to obtaining an input value for your neural network's next layer: multiply each of your inputs by some weight, and them sum them up. We can just as easily write the above step as a matrix-vector multiplication:

--write that --

Next, we feed these two inputs into a logistic function that returns a continuous value over a distrubution. The results from this function is called the activation of the hidden layer. 

Why do we need to feed our two units into a logistic function to "activate" our hidden layer? Well, a logistic function introduces **nonlinearity** into our learning model. This is essential to training a neural network successfully. When we use neural networks, we are typically working with data where the inputs aren't linearly correlated to their outputs. Since the data we wish to make a model for is nonlinear, we must introduce nonlinearity into our model. The sigmoid function allows our network to account for the fact that the output can't be obtained just by taking several linear combinations of our inputs. If our activation function was linear, our neural network won't be effective more than one layer deep, since multiple linear functions just add up produce another linear function. 

Here's what the sigmoid function looks like:
-- present graph and equation

The sigmoid function has some useful properties that render it useful in training neural networks. Namely, it can take any real valued input (which results from our linear combination of input and weights) and map it to a range such as (0,1) or (-1,1). Moreover, it is continuous and differentiable, with an easy to compute derivative: 

-- present derivative of sigmoid function --

Putting our inputs into this hidden layer into the sigmoid function, we obtain the following values for our activation units:

-- do that math --

Now, we can repeat this same process to continue our forward pass through the neural network. We will take a linear combination of these activation units by multiplying them with their weights that map them to produce an input into our output layer. Also similar to our above computation, we will pass those results to the sigmoid function to obtain the output values for our network:

-- 

So, we have the initial predictions of our neural network: this and this. Before we take a look at adjusting our weights and minimizing our errors, let's generalize the forward pass process so we can see how it applies to a large training set and thousands of units: 

### Generalizing Forward Propagation

When dealing with any kind of data at scale, we don't want to be computing our feedforward step as above (calcuating explicitly the value for each unit, and running each input through an activation function) - this will require us to write a bunch of expensive `for` loops while we iterate through matrices. Rather, we can write our feedforward steps using some basic linear algebra concepts, and then use NumPy arrays to provide us with increased efficiency and convenience when implementing the feed forward step. For our inputs -> hidden layer step, we can write the activation as a matrix-vector multiplication:

-- do that --

Which we then input into the activation function:

-- do that --

More generally, for the entire data set, we let A in R n by m+1 be a matrix representing our inputs and bias unit. We also let W in R h by m + 1 be a weight matrix that connects our inputs to the hidden layer. Our activation can then be written as follows: 

-- --- 

We can write a similar expression for our hidden layer -> output layer step:

-- do that --

### Exploring Backpropagation

Now that we have an (inaccurate) prediction for our values, our goal is to update all of our weights in the network so that they cause the actual output to approach the target output. In other words, we want to minimize the error. Let's take a look at the mean-squared error function for our neural network: 

-- E = 1/2(target - output)^2 + ...

Since we want to update our weights, it makes sense to develop some insight into how much a change in a particular weight would affect our error. In other words, we want to compute the partial derivative of our error function with respect to the weights. Our error function is pretty complex - it's defined by multiple layers of linear transformations and logistic functions. Backpropagation is essentially an **efficient approach** to computing partial derivatives of this complex cost function. It overcomes the challenges that limited the popularity of neural networks when they were first discovered, some of which are a large number of weights, a high-dimensional feature space, and local minima in the cost function. Let's take a look at how backpropagation can work to update one of our weights; for example, weight 1. 

We start with our error function E defined above, and wish to compute dE/dw1. Looking at our error function, we see that its a composition of many functions. Lookint at our definitions for out1, out2, we see that they are composed of act1, act2, etc. Using our function definitions from the forward propagation step, we can expand our error function:

-- do that --

Computing the derivative with respect to the first weight thus requires usage of the chain rule. If you remember from calculus, the chain rule allows us to compute derivatives of compositions of functions: 

y = f(g(x)) then dy/dx = df/dg * dg/dx. Similarly, dE/dw1 = dE/dout1 * dE/dnet1 * dnet1/dw1. Let's go through the computation of these derivatives step by step: 

-- do that -- 

Now, we can update w1 as follows, optionally multiplied by a constant called the learning rate. 

We can do similar computations for the rest of the weights (left as an exercise to the reader), and obtain: 

-- all the other weight values -- .

Doing another forward pass through our neural network, we obtain the values as our new outputs. Our error is now down to x. This doesn't seem like much, but if you run this algorithm thousands of times through your dataset, you'll find that the error does indeed minimize, and we get some pretty accurate predictions. 

Thanks for reading!








