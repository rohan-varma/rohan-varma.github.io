---
layout: post
title: Implementing a Neural Network in Python
---

[In progress write-up on neural networks]


### Defining the Learning Problem 

In supervised learning problems, we're given a training dataset that contains pairs of input instances and their corresponding labels. For example, in the MNIST dataset, our input instances are images of handwritten digits, and our labels are a single digit that indicate the number written in the image. To input this training data to a computer, we need to numerically represent our data. Each image in the MNIST dataset is a 28 x 28 grayscale image, so we can represent each image as a vector $ \bar{x} \in R^{784} $. The elements in the vector x are known as features, and in this case they're values in between 0 and 255. Our labels are commonly denoted as y, and as mentioned, are in between 0 and 9.

We can think of this dataset as a sample from some probability distribution over the feature/label space, known as the data generating distribution. Specifically, this distribution gives us the probability of observing any particular (x, y) pairss for all (x, y) pairs in the cartesian product $ X x Y $. Intuitively, we would expect that the pair that consists of an image of a handwritten 2 and the label 2 to have a high probablity, while a pair that consists of a handwritten 2 and the label 9 to have a low probability.

Unfortunately, we don't know what this data generating distribution is parametrized by, and this is where machine learning comes in: we aim to learn a function h that maps feature vectors to labels as accurately as possible. This function should generalize well: we don't just want to learn a function that produces a flawless mapping on our training set, the function needs to be able to generalize over all unseen examples in the distribution. With this, we can introduce the idea of the loss function, a function that quantifies how off our prediction is from the true value. The loss function gives us a good idea about our model's performance, so over the entire population of (feature vector, label) pairs, we'd want the expectation of the loss to be low. Therefore, we want to find h(x) that minimizes the following function:

$ E[L(y, h(\bar{x}))] = \sum_{(\bar{x}, y) \in D} p(x, y)L(y, h(x)) $

However, there's a problem here: we can't compute p(x, y), so we have to resort to approximations of the loss function based on the training data that we do have access to. To approximate our loss, it is common to sum the loss function's output across our training data, and then divide it by the number of training examples to obtain an average loss, known as the training loss: 

$ \frac{1}{N} \sum_{i=1}^{N} L(y_i, h(x_i))

There are several different loss functions than 


In the space of neural networks, the function h(x) we will find will consist of several operations of matrix multiplications followed by applying nonlinearity functions. The basic idea is that we need to find the parameters of this function that both produce a low training loss and generalize well to unseen data. With our learning problem defined, we can get on to the implementation of the network: 

### Precursor: A single Neuron

-- Stuff about how a single neuron is modeled, and then say neural nets are just several of these. 
-- Talk about softmax function
-- Graphic of 1 classifier, 2 classifier, ... 9 classifier


### A neural network with a single hidden layer
-- Talk about the entire implementation 


### Training the network with backpropagation


### Fine-tuning gradient descent
Talk about SGD, learning rate, decaying learning rate, and momentum.

### Preventing our network from overfitting
Talk about L1 and L2 regularization and dropout 


### Tuning Hyperparameters with K-Fold Cross Validation


### 
