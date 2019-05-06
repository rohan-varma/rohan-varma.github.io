#### Linear

##### Fields

A field $$ \mathbb{F} $$ is a set with 2 operations: $$ + : \mathbb{F} \times{} \mathbb{F} \rightarrow{} \mathbb{F} $$  and $$ * : \mathbb{F} \times{} \mathbb{F} \rightarrow{} \mathbb{F}$$ with the following axioms (assume that all $$a, b, c \in \mathbb{F}$$:

1. Commutativity of addition: $$ a + b = b + a$$ 
2. Associativity of addition: $$ a + (b + c) = (a + b) + c$$
3. Additive identity (zero): $$ 0 = 0_F$$ such that $$ \forall{} a \in \mathbb{F}, a + 0 = a $$ 
   1. Note: this zero is necessarily unique (think about how to prove this)
4. Additive inverse: $$ \forall a \in \mathbb{F}, \exists b \in \mathbb{F} $$ such that $$ a + b = 0$$ and this $$ b $$ is $$ -a $$.
5. Multiplicative identity: $$ \exists 1 = 1_F $$ such that $$ 1 * a = a \forall a \in \mathbb{F}$$ 
6. $$ 0_F \neq 1_F$$ 
7. Inversion of nonzero elements: $$ \forall a \in F, a \neq 0, \exists b $$ such that $$ ab = 1, b = \frac{1}{a}$$, and $$ b $$ is necesarily unique (think about the proof for this)

##### Vector Spaces

- Fix a field $$ \mathbb{F}$$. A vector space $$ V $$ over the field $$ \mathbb{F}$$ is a set $$ V $$ with 2 operations: $$ + $$ and $$ * $$, called addition and scalar multiplication.
- Addition happens in the vector space: $$ * : V \times V \rightarrow{} V $$ and scalar multiplication has an argument from the field: $$ *: \mathbb{F} \times V \rightarrow{} V$$
- A vector space must follow the following axioms:
  1. $$ \forall{} x, y, z \in V (x + y) + z = x + (y + z)$$ 
  2. $$ x + y = y + x \forall{} x, y \in V$$
  3. $$ \exists 0 = 0_V $$ such that $$ 0 + x = x                     \forall x \in V $$
  4. $$ \forall{x}\in V, \exists{y}:x + y = 0, y = -x$$ 
  5. $$\forall{a} \in F, x, y \in V, a* (x + y) = ax + ay$$ (distributivity)
  6. $$ \forall{a,b} \in F, x \in V (ab) * x = b * (ax) = a * (bx)$$
  7. $$ (a + b) * x = ab + bx $$
  8. $$ \forall{x} \in V, 1_F * x = x$$ (existance of the multiplicative identity)
- Therefore, given a field that the vector space is over, the set $$ V $$ and the defintions of $$ +, * $$, we can check if $$ V $$ is a vector space by checking the above axioms.
- Example: pick $$ n \in \mathbb{N} $$  and let $$ V = \mathbb{F}^n $$ which is n-tuples of scalars in $$ \mathbb{F}$$, this is a vector space. If we let $$ \mathbb{F} = \mathbb{R}$$ then we have the typical vectors in $$ \mathbb{R}^n$$ that we know
  - But it is important to realize how we have defined this: instead of defining directly what vectors are and what they can do, we have defined the abstract concept of a vector space, and a vector is simply any element of a certain vector space. If defined properly, arbitrary objects or numbers in $$ \mathbb{C}$$ could be vectors - this is known as *abstraction*, and is a central idea in computer science.
- Example: polynomials in a variable $$ T $$ constitute a vector space: $$ V = P(\mathbb{F}) = \mathbb{F}[T] $$, i.e. $$ V $$ contains polynomials of the form $$ a_0 + a_1T + …a_dT^d $$, where $$ a_i \in \mathbb{F} $$ and addition and scalar multiplication are defined in the usual way.

##### Subspaces

- A subset $$ W \in V $$ where $$ V $$ is a vector space over a field $$\mathbb{F}$$ is a *subspace* of $$ V $$ if:
  1. $$ 0_V \in W $$ (zero is in the subspace)
  2. $$\forall{w_1, w_2} \in W, w_1 + w_2 \in W$$ (sum of two elements in the subspace is in the subspace, called closure under addition)
  3. $$ \forall{a} \in \mathbb{F}, w \in W, a * w \in W $$ (scaling elements in the subspace returns an element in the subspace, called closure under multiplication)
- We can simply condense these three conditions as closure under linear combination, since that encompasses closure under addition and multiplication, and closure under linear combination implies that zero is in the subspace, since $$ 0 = 0 * w, w \in W $$ which is a linear combination of elements in $$ W $$.
- Examples: polynomials of degree at most $$ n $$ is a subspace of $$ P(\mathbb{F}) $$, i.e. the subspace is concretely $$P_n(\mathbb{F}) = {a_0 + a_1T + … a_dT^d \in P(\mathbb{F})}, d \leq n $$
- Non-examples: $$ W = {{ [x_1, x_2]^T \in \mathbb{R}^2, x_1 * x_2 =  0}} $$ is not a subspace (show why not)
- $$W = { [x_1, x_2]^T \in \mathbb{R}^2, x_1 , x_2 \geq  0}$$ over the field $$\mathbb{R}$$ is not a subspace (show why not, using the field) 









