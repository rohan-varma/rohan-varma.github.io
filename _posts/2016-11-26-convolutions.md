---
layout: post
title: Understanding Convolutions with Python 
---
![An edge-detecting convolution on UCLA's Royce Hall.](http://deeplearning.stanford.edu/wiki/images/thumb/8/85/STL_Logistic_Classifier.png/380px-STL_Logistic_Classifier.png "Inputs into a neuron and its output.")

A convolution is an operation that takes in two functions and produces a third function that's generally a modified version of one of the input functions. Convolutions have many uses, from signal processing, edge detection, and in convolutional neural networks. Let's define a convolution with an example. Consider two matrices, f and g: 


In general, this can be extended to summing the product of two different functions at discrete points. If f and g were general functions, we'd define our convolution as: 

![convolution][
